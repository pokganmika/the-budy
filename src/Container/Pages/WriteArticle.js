// import React, { useRef, useState, useEffect } from 'react';
// import styled from 'styled-components';
// import { white } from '../../Common/Styles/Colors';
// import Modal from '../../Common/Collections/Modal';
// import WriteArticleView from '../../Presenter/Pages/WriteArticle/WriteArticleView';
// import TopicSettingView from '../../Common/Collections/Modals/TopicSetting';
// import { PostProvider } from '../../Provider/Post/postContext';
// import useEditArticle from '../../Provider/Post/useEditArticle';
// import queryString from 'query-string';

// const viewTypes = {
//   writeArticle: 'WRITE_ARTICLE',
//   topicSetting: 'TOPIC_SETTING',
//   mobileEditor: 'MOBILE_EDITOR'
// };

// function WriteArticle({ location }) {
//   const [currentView, setView] = useState(viewTypes.writeArticle);

//   const viewRef = useRef(null);

//   const store = useEditArticle();
//   const [writeArticleState, writeArticleHandlers] = store;
//   const { isLoaded } = writeArticleState;
//   const { editArticle, createDraft } = writeArticleHandlers;

//   const articleId = queryString.parse(location.search).id || null;
//   console.log(articleId);

//   useEffect(() => {
//     if (articleId) {
//       editArticle(articleId);
//     } else {
//       createDraft();
//     }
//   }, []);

//   const closeTopicSetting = () => setView(viewTypes.writeArticle);

//   return (
//     <PostProvider store={store}>
//       {isLoaded ? (
//         <Page ref={viewRef}>
//           {currentView === viewTypes.writeArticle && (
//             // <WriteArticleView viewRef={viewRef} />
//             <button onClick={() => setView(viewTypes.topicSetting)}>
//               topicSetting
//             </button>
//           )}

//           {currentView === viewTypes.topicSetting && (
//             <Modal close={closeTopicSetting}>
//               <TopicSettingView close={closeTopicSetting} />
//             </Modal>
//           )}
//         </Page>
//       ) : null}
//     </PostProvider>
//   );
// }

// const Page = styled.div`
//   position: fixed;
//   left: 0;
//   top: 0;
//   z-index: 20;
//   width: 100%;
//   height: 100%;
//   background-color: ${white};
//   overflow: auto;
// `;

// export default WriteArticle;

import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { white } from '../../Common/Styles/Colors';
import Modal from '../../Common/Collections/Modal';
import WriteArticleView from '../../Presenter/Pages/WriteArticle/WriteArticleView';
import TopicSettingView from '../../Common/Collections/Modals/TopicSettingView';
// import MobileEditorForm from '../../Presenter/Pages/CreateArticle/MobileEditorForm';
import { PostProvider } from '../../Provider/Post/postContext';
import useWriteArticle from '../../Provider/Post/useWriteArticle';
import queryString from 'query-string';
import Loader from 'react-loader-spinner';
import {primary} from '../../Common/Styles/Colors';

function WriteArticle({ history, location }) {
  const articleId = queryString.parse(location.search).id || null;
  const type = articleId ? 'edit' : 'create';
  const viewRef = useRef(null);
  const store = useWriteArticle(history);
  const {
    formTypes,
    state: {
      isLoaded,
      currentView,
      topicList,
      topicName,
      searchResultTopics,
      tempSelectedTopics
    },
    handlers: {
      editArticle,
      createDraft,
      closeTopicSetting,
      createTopic,
      addTopic,
      deleteTopic,
      changeTopicName,
      completeTopic,
      removeTopicName,
      clearTopics
    }
  } = store;

  useEffect(() => {
    if (type === 'edit') {
      editArticle(articleId);
    }
    if (type === 'create') {
      createDraft();
    }
  }, []);

  return (
    <PostProvider store={store}>
      {isLoaded ? (
        <Page ref={viewRef}>
          <WriteArticleView viewRef={viewRef} type={type} />
          {currentView === formTypes.topicSetting && (
            <Modal close={closeTopicSetting}>
              <TopicSettingView
                postType="article"
                topicList={topicList}
                topicName={topicName}
                searchResultTopics={searchResultTopics}
                tempSelectedTopics={tempSelectedTopics}
                createTopic={createTopic}
                addTopic={addTopic}
                deleteTopic={deleteTopic}
                changeTopicName={changeTopicName}
                completeTopic={completeTopic}
                closeTopicSetting={closeTopicSetting}
                removeTopicName={removeTopicName}
                clearTopics={clearTopics}
              />
            </Modal>
          )}
          {/* {currentView === formTypes.mobileEditor && <MobileEditorForm />} */}
        </Page>
      ) : (
          <LoaderWrapper>
            <Loader type="ThreeDots" color={primary[500]} height={40} width={40} />
          </LoaderWrapper>
        )
      }
    </PostProvider>
  );
}

const LoaderWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
`;

const Page = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  z-index: 20;
  width: 100%;
  height: 100%;
  background-color: ${white};
  overflow: auto;
`;

export default WriteArticle;
