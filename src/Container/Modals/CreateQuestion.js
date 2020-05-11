import React from 'react';
import { withRouter } from 'react-router-dom';
import CreateQuestionView from '../../Presenter/Modals/CreateQuestion/CreateQuestionView';
import TopicSettingView from '../../Common/Collections/Modals/TopicSettingView';
import { PostProvider } from '../../Provider/Post/postContext';
import useCreateQuestion from '../../Provider/Post/useCreateQuestion';

function CreateQuestion({ closeModal, closeCreateQuestion, history }) {
  const store = useCreateQuestion(history, closeModal);
  const {
    formTypes: { createQuestion, topicSetting },
    state: {
      currentView,
      topicList,
      searchResultTopics,
      tempSelectedTopics,
      topicName
    },
    handlers: {
      closeTopicSetting,
      completeTopic,
      createTopic,
      addTopic,
      deleteTopic,
      clearTopics,
      changeTopicName,
      removeTopicName
    }
  } = store;

  return (
    <PostProvider store={store}>
      {currentView === createQuestion && (
        <CreateQuestionView closeCreateQuestion={closeCreateQuestion} />
      )}
      {currentView === topicSetting && (
        <TopicSettingView
          closeTopicSetting={closeTopicSetting}
          completeTopic={completeTopic}
          topicList={topicList}
          searchResultTopics={searchResultTopics}
          tempSelectedTopics={tempSelectedTopics}
          topicName={topicName}
          createTopic={createTopic}
          addTopic={addTopic}
          deleteTopic={deleteTopic}
          clearTopics={clearTopics}
          changeTopicName={changeTopicName}
          removeTopicName={removeTopicName}
        />
      )}
    </PostProvider>
  );
}

export default withRouter(CreateQuestion);
