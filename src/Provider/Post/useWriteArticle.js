import { useState } from 'react';
import axios from 'axios';
import { getAccessToken } from '../../Service/token';
import { POST_API, TOPIC_API } from '../../Config/api';
import { getPostDetail, postCreateDraft } from '../../API/Post';
import { postCreateTopic } from '../../API/Topic';

function useWriteArticle(history) {
  const formTypes = {
    createArticle: 'createArticle',
    topicSetting: 'topicSetting',
    mobileEditor: 'mobileEditor'
  };

  const initialState = {
    isLoaded: false,
    postId: null,
    currentView: formTypes.createArticle,
    coverImage: null,
    title: '',
    body: null,
    text: '',
    textLength: 0,
    topicName: '',
    topicList: null,
    searchResultTopics: [],
    selectedTopics: [],
    tempSelectedTopics: new Map(),
    formDataImage: null,
    base64Image: null
  };

  const [state, setState] = useState(initialState);

  const updateState = (key, value) => {
    return setState(prevState => {
      return {
        ...prevState,
        [key]: value
      };
    });
  };

  const handlers = {
    setImage: url => updateState('coverImage', url),
    removeImage: () => updateState('coverImage', null),
    removeTopicName: () => updateState('topicName', ''),
    initTitle: () => updateState('title', ''),
    changeTitle: event => updateState('title', event.target.value),
    changeBody: (html, text, textLength) => {
      return setState(prevState => {
        return {
          ...prevState,
          body: html,
          text: text,
          textLength: textLength
        };
      });
    },
    completeBody: () => updateState('currentView', formTypes.createArticle),
    openMobileEditor: () => updateState('currentView', formTypes.mobileEditor),
    closeMobileEditor: () => {
      if (state.textLength === 0)
        return updateState('currentView', formTypes.createArticle);

      const result = window.confirm(
        'Are you sure you want to delete what you are writing?'
      );

      if (result && state.textLength > 0) {
        return setState(prevState => {
          return {
            ...prevState,
            currentView: formTypes.createArticle,
            body: ''
          };
        });
      }

      return;
    },
    openTopicSetting: async () => {
      try {
        updateState('currentView', formTypes.topicSetting);
        if (state.topicList === null) {
          const response = await axios.get(`${TOPIC_API}/search`);
          const payload = response.data;
          if (payload.success) {
            const topics = payload.topics.map(topic => [topic.id, topic]);
            const topicMap = new Map(topics);
            return updateState('topicList', topicMap);
          }
          return;
        }
      } catch (err) {
        return err;
      }
    },
    closeTopicSetting: () => {
      return setState(prevState => {
        const topicList = prevState.topicList;
        const tempSelectedTopics = prevState.tempSelectedTopics;
        for (let [topicId, topic] of tempSelectedTopics) {
          topic.selected = false;
          topicList.set(topicId, topic);
        }
        return {
          ...prevState,
          topicName: '',
          currentView: formTypes.createArticle,
          topicList,
          tempSelectedTopics: new Map()
        };
      });
    },
    changeTopicName: topicName => {
      return setState(prevState => {
        let topicList = [...prevState.topicList.values()];
        const updatedTopics = topicList.filter(
          item => item.TopicName.search(topicName.toLowerCase()) !== -1
        );
        return {
          ...prevState,
          topicName,
          searchResultTopics: updatedTopics
        };
      });
    },
    createTopic: async () => {
      if (state.tempSelectedTopics.size === 5) {
        return;
      }
      try {
        const payload = await postCreateTopic(state.topicName || '');
        if (payload.success) {
          const topic = payload.result.Topic;
          
          topic.selected = true;
          topic.PostCount = 0;
          
          return setState(prevState => {
            let topicListWithNewItem = prevState.topicList.set(
              topic.id,
              topic
            )

            let tempSelectedTopicWithNewItem = prevState.tempSelectedTopics.set(
              topic.id,
              topic
            )

            let topicList = [...prevState.topicList.values()];
            const updatedTopics = topicList.filter(
              item => item.TopicName.search(prevState.topicName.toLowerCase()) !== -1
            );

            return {
              ...prevState,
              tempSelectedTopics: tempSelectedTopicWithNewItem,
              topicList: topicListWithNewItem,
              searchResultTopics: updatedTopics,
            };
          });
        }
        if (payload.errors) {
          console.log('error', payload);
          return false;
        }
      } catch (err) {
        console.log('request-error', err);
        return false;
      }
    },
    addTopic: topic => {
      if (state.tempSelectedTopics.size === 5) {
        return;
      }

      topic.selected = true;

      return setState(prevState => {
        return {
          ...prevState,
          tempSelectedTopics: prevState.tempSelectedTopics.set(topic.id, topic),
          topicList: prevState.topicList.set(topic.id, topic)
        };
      });
    },
    deleteTopic: topic => {
      topic.selected = false;

      return setState(prevState => {
        prevState.tempSelectedTopics.delete(topic.id);

        return {
          ...prevState,
          tempSelectedTopics: prevState.tempSelectedTopics,
          topicList: prevState.topicList.set(topic.id, topic)
        };
      });
    },
    editTopic: async () => {
      if (state.topicList === null) {
        const response = await axios.get(`${TOPIC_API}/search`);
        const payload = response.data;
        if (payload.success) {
          const topics = payload.topics.map(topic => [topic.id, topic]);
          const topicMap = new Map(topics);
          updateState('topicList', topicMap);
        }
      }
      return setState(prevState => {
        const topicList = prevState.topicList;
        const selectedTopics = prevState.selectedTopics.map(topic => [
          topic.id,
          topic
        ]);
        
        for (let [selectedTopicId, selectedTopic] of selectedTopics) {
          const topic = topicList.get(selectedTopicId);
          topic.selected = true;
          topicList.set(selectedTopicId, topic);
        }

        return {
          ...prevState,
          currentView: formTypes.topicSetting,
          tempSelectedTopics: new Map(selectedTopics),
          topicList
        };
      });
    },
    completeTopic: () => {
      return setState(prevState => {
        const topicList = prevState.topicList;
        const tempSelectedTopics = prevState.tempSelectedTopics;
        for (let [topicId, topic] of tempSelectedTopics) {
          topic.selected = true;
          topicList.set(topicId, topic);
        }
        return {
          ...prevState,
          topicName: '',
          currentView: formTypes.createQuestion,
          selectedTopics: [...tempSelectedTopics.values()],
          tempSelectedTopics: new Map(),
          topicList
        };
      });
    },
    createArticle: async container => {
      try {
        const { body, text } = container;
        const { postId, title, selectedTopics, coverImage } = state;
        if (title && body && selectedTopics.length > 0) {
          const user = await getAccessToken();
          const config = {
            headers: {
              'Content-Type': 'multipart/form-data',
              'x-access-token': user.accessToken
            }
          };
          const formData = new FormData();
          formData.append('attach', coverImage);
          formData.append('Title', title);
          formData.append('Body', body);
          formData.append('BodyText', text);
          formData.append('IsDraft', 0);
          formData.append('Topics', JSON.stringify(selectedTopics));
          console.log({
            attach: coverImage,
            Title: title,
            Body: body,
            BodyText: text,
            IsDraft: 0,
            Topics: JSON.stringify(selectedTopics)
          });
          const response = await axios.patch(
            `${POST_API}/article/${postId}`,
            formData,
            config
          );
          const { success, result } = response.data;
          if (success) {
            console.log(result);
            return history.push(`/article/${postId}`);
          }
        }
      } catch (err) {
        return console.log(err);
      }
    },
    editArticle: async answerId => {
      try {
        const data = await getPostDetail(answerId, 'article');
        if (data.success) {
          const article = data.result.Posts[0];
          const topicList = data.result.Topics;
          setState(prevState => {
            return {
              ...prevState,
              isLoaded: true,
              coverImage: article.CoverImageUrl,
              postId: article.id,
              title: article.Title,
              body: article.Body,
              text: article.BodyText,
              textLength: article.BodyText.length,
              selectedTopics: topicList
            };
          });
        }
        if (data.errors) {
          return console.log(data);
        }
      } catch (err) {
        return console.log(err);
      }
    },
    createDraft: async () => {
      try {
        const data = await postCreateDraft('article');
        if (data.success) {
          return setState(prevState => {
            return {
              ...prevState,
              isLoaded: true,
              postId: data.result.PostId
            };
          });
        }
        if (data.errors) {
          return console.log(data);
        }
      } catch (err) {
        return console.log(err);
      }
    },
    setContainer: container => {
      return setState(prevState => {
        return {
          ...prevState,
          ...container
        };
      });
    },
    clearTopics: () => {
      return setState(prevState => {
        const topicList = prevState.topicList;
        const tempSelectedTopics = prevState.tempSelectedTopics;
        for (let [topicId, topic] of tempSelectedTopics) {
          topic.selected = false;
          topicList.set(topicId, topic);
        }
        return {
          ...prevState,
          topicList,
          tempSelectedTopics: new Map()
        };
      });
    }
  };

  return {
    state,
    handlers,
    formTypes
  };
}

export default useWriteArticle;
