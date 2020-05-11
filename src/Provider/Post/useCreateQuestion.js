import { useState } from 'react';
import axios from 'axios';
import { getAccessToken } from '../../Service/token';
import { POST_API, TOPIC_API } from '../../Config/api';
import { postCreateTopic } from '../../API/Topic';

function useCreateQuestion(history, closeModal) {
  const formTypes = {
    createQuestion: 'createQuestion',
    topicSetting: 'topicSetting'
  };

  const initialState = {
    currentView: formTypes.createQuestion,
    title: '',
    topicName: '',
    topicList: null,
    searchResultTopics: [],
    selectedTopics: [],
    tempSelectedTopics: new Map(),
    formDataImage: null,
    base64Image: null
  };

  const [state, setState] = useState(initialState);

  const updateState = newState => {
    return setState(prevState => {
      return {
        ...prevState,
        ...newState
      };
    });
  };

  const handlers = {
    setTitle: event => updateState({ title: event.target.value }),
    removeTitle: () => updateState({ title: '' }),
    setImage: ({ file, base64 }) =>
      updateState({ formDataImage: file, base64Image: base64 }),
    removeImage: () => updateState({ formDataImage: null, base64Image: null }),
    removeTopicName: () => updateState({ topicName: '' }),
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
    openTopicSetting: async () => {
      try {
        updateState({ currentView: formTypes.topicSetting });
        if (state.topicList === null) {
          const response = await axios.get(`${TOPIC_API}/search`);
          const payload = response.data;
          if (payload.success) {
            const topics = payload.topics.map(topic => [topic.id, topic]);
            const topicMap = new Map(topics);
            return updateState({ topicList: topicMap });
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
          currentView: formTypes.createQuestion,
          topicList,
          tempSelectedTopics: new Map()
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
    },
    editTopic: () => {
      return setState(prevState => {
        const topicList = prevState.topicList;
        const selectedTopics = prevState.selectedTopics.map(topic => [
          topic.id,
          topic
        ]);
        const tempSelectedTopics = new Map(selectedTopics);
        for (let [topicId, topic] of tempSelectedTopics) {
          topic.selected = true;
          topicList.set(topicId, topic);
        }
        return {
          ...prevState,
          currentView: formTypes.topicSetting,
          tempSelectedTopics,
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
    createPost: async e => {
      try {
        e.preventDefault();
        const user = await getAccessToken();
        const { formDataImage, title, selectedTopics } = state;

        if (user.accessToken && title && selectedTopics.length > 0) {
          const config = {
            headers: {
              'Content-Type': 'multipart/form-data',
              'x-access-token': user.accessToken
            }
          };
          console.log({ formDataImage, title, selectedTopics });
          const formData = new FormData();
          formData.append('attach', formDataImage);
          formData.append('Title', title);
          formData.append('Topics', JSON.stringify(selectedTopics));

          const response = await axios.post(
            `${POST_API}/question`,
            formData,
            config
          );
          const { success, result } = response.data;
          console.log(success);
          if (success) {
            closeModal(false);
            return history.push(`/question/${result.PostId}`);
          }
        }
      } catch (err) {
        return console.log(err);
      }
    }
  };

  return {
    formTypes,
    state,
    handlers
  };
}

export default useCreateQuestion;
