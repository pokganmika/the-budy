import React, { useState, useEffect, useContext, useRef } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { USER_API, TOPIC_API } from '../../../../Config/api';
import AppContext from '../../../../App/context';
import linkChecker from '../../../../Service/linkCheck';
import Icon from '../../../../Common/Modules/Icon';
import { primary, greyscales } from '../../../../Common/Styles/Colors';
// import SocialLinkModal from '../MyPageModal/SocialLink';
import NewSocialLinkModal from '../MyPageModal/NewSocialLink';
import TopicSettingModal from '../MyPageModal/TopicSettingModal';
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from 'body-scroll-lock';
import {
  Medium,
  Facebook,
  Youtube,
  Twitter,
} from '../../../../Service/socialIcons';
import { Title } from './style';

const Wrapper = styled.div`
  width: 100%;
  height: fit-content;
  padding: 40px 24px;
  @media (max-width: 650px) {
    width: 100%;
    height: 100%;
    padding: 24px 16px;
  }
`;

const Subtitle = styled.div`
  font-size: 16px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.38;
  letter-spacing: normal;
  color: ${greyscales[800]};
  padding: 8px 0;
`;

const SubtitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${greyscales[400]};
  margin: 32px 0 0 0;
`;

const SocialLinkWrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.29;
  letter-spacing: normal;
  color: ${greyscales[400]};
  cursor: pointer;
`;

const SocialLinkIconWrapper = styled.div`
  display: flex;
`;

const Message = styled.div`
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.14;
  letter-spacing: normal;
  color: rgba(0, 0, 0, 0.5);
  padding: 8px 0;
  margin-bottom: 24px;
`;

const TopicsWrapper = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-wrap: wrap;
`;

const EditIcon = styled.span`
  margin-left: 9px;
  display: inline-block;
  color: ${({ color }) => (color ? color : greyscales[800])};
`;

const topicModalInitState = {
  type: '',
  toggleSwitch: false,
};

const socialLinkState = {
  urlLink: '',
  linkData: [],
};

const profileInitState = {
  isLoading: true,
  urlLink: '',
  knowsAbout: [],
  interests: [],
  url: [],
};

const Profile = ({
  history,
  idToken,
  addSocialLink,
  removeSocialLink,
  myPageChangeCount,
}) => {
  const [topicToggle, setTopicToggle] = useState(topicModalInitState);
  const [socialLinkToggle, setSocialLinkToggle] = useState(false);
  const [topicValue, setTopicValue] = useState('');
  const [topicList, setTopicList] = useState([]);
  const [standardTopicList, setStandardTopicList] = useState([]);
  const [selectedTempTopicList, setSelectedTempTopicList] = useState([]);
  const [socialLink, setSocialLink] = useState(socialLinkState);
  const [data, setData] = useState(profileInitState);
  const [changeCount, setChangeCount] = useState(0);
  const [showCreate, setShowCreate] = useState(false);
  const [appState] = useContext(AppContext);
  const { budyId } = appState.user;
  const targetRef = useRef();
  let targetElement = null;

  // console.log('::Profile Init State:: ---> : ', data);
  // console.log('::Profile topicList:: ---> : ', topicList);
  // console.log('::Profile standardTopicList:: ---> : ', standardTopicList);
  // console.log(
  //   '::Profile selectedTempTopicList:: ---> : ',
  //   selectedTempTopicList
  // );
  // console.log(
  //   '이거만 확인하면 : ',
  //   topicList.includes(element => console.log(element.TopicName))
  // );
  // topicList.includes(element => {
  //   console.log('제발', element.TopicName);
  // });
  console.log('이거 제발: ', showCreate);

  const getProfileData = async () => {
    try {
      const tokenData = { 'x-access-token': idToken };
      const response = await axios.get(`${USER_API}/users/${budyId}/info`, {
        headers: tokenData,
      });

      const { knowsAbout, interests, url } = response.data.result;

      knowsAbout.map(value => {
        value.topicId = value.TopicId;
        delete value.TopicId;
      });
      interests.map(value => {
        value.topicId = value.TopicId;
        delete value.TopicId;
      });

      setData(prevState => ({
        ...prevState,
        isLoading: false,
        knowsAbout,
        interests,
        url,
      }));
    } catch (error) {
      console.error(error);
    }
  };

  const addLink = async () => {
    // TODO: case 1.
    // const tempList = socialLinkData;
    // tempList.push({
    //   Url: socialLink.urlLink
    // });
    // setSocialLink(prevState => ({
    //   ...prevState,
    //   urlLink: '',
    //   linkData: tempList
    // }));
    // addSocialLink(socialLink.urlLink);

    // TODO: case 2.
    // const tokenData = { 'x-access-token': idToken };
    // await addSocialLink(socialLink.urlLink);
    // const result = await axios
    //   .get(`${USER_API}/users/me/urls`, { headers: tokenData });
    // setSocialLink(prevState => ({
    //   ...prevState,
    //   urlLink: '',
    //   linkData: result.data.result
    // }));

    // TODO: case 3.
    try {
      const tokenData = { 'x-access-token': idToken };
      const linkData = { url: data.urlLink };
      await axios.post(`${USER_API}/users/me/urls`, linkData, {
        headers: tokenData,
      });
      const response = await axios.get(`${USER_API}/users/me/urls`, {
        headers: tokenData,
      });
      console.log('::mypage profile component link check::', response);
      setData(prevState => ({
        ...prevState,
        urlLink: '',
        url: response.data.result,
      }));
    } catch (error) {
      console.error(error);
    }
  };

  /**
   *
   * @param {string} id
   */
  const removeLink = async id => {
    const tempList = data.url;
    for (let i = 0; i < tempList.length; i++) {
      if (tempList[i]['id'] === id) {
        tempList.splice(i, 1);
      }
    }
    setData(prevState => ({
      ...prevState,
      url: tempList,
    }));
    try {
      const tokenData = { 'x-access-token': idToken };
      await axios.delete(`${USER_API}/users/me/urls/${id}`, {
        headers: tokenData,
      });
    } catch (error) {
      console.error(error);
    }

    // const tempList = socialLinkData;
    // for (let i = 0; i < tempList.length; i++) {
    //   if (tempList[i]['id'] === id) {
    //     tempList.splice(i, 1);
    //   }
    // }
    // setSocialLink(prevState => ({
    //   ...prevState,
    //   linkData: tempList
    // }));
    // removeSocialLink(id);
  };

  // TODO: all 삭제
  const removeAllLinkList = async e => {
    e.preventDefault();
    // setSocialLink(prevState => ({
    //   ...prevState,
    //   linkData: []
    // }));
    setData(prevState => ({
      ...prevState,
      url: [],
    }));
    try {
      const tokenData = { 'x-access-token': idToken };
      // const data = {
      //   id: socialLinkData.map(link => link.id)
      // };
      const response = await axios.delete(`${USER_API}/users/me/urls/all`, {
        headers: tokenData,
      });
      // const result = await axios
      //   .delete(
      //     `${USER_API}/users/me/urls`,
      //     {
      //       data: data,
      //       headers: tokenData
      //     }
      //   );
      console.log('::mypage profile removeAllLinkList::', response);
    } catch (error) {
      console.error(error);
    }
  };

  // const getLinkData = () => {
  //   setSocialLink(prevState => ({
  //     ...prevState,
  //     linkData: socialLinkData
  //   }));
  // };

  const onChangeSocialForm = e => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  // const onChangeSocialForm = e => {
  //   setSocialLink({ ...socialLink, [e.target.name]: e.target.value });
  // };

  // TODO: MODIFY name : onChangeToggleState -> onChangeSocialLinkToggleState
  const onChangeToggleState = () => setSocialLinkToggle(!socialLinkToggle);

  // ================================================================

  /**
   *
   * @param {string} type
   */
  const onChangeTopicToggleState = type => {
    setTopicToggle(prevState => ({
      ...prevState,
      type,
      toggleSwitch: !prevState.toggleSwitch,
    }));

    topicToggle.toggleSwitch
      ? enableBodyScroll(targetElement)
      : disableBodyScroll(targetElement);

    if (type === 'knowsAbout') {
      setSelectedTempTopicList([...data.knowsAbout]);
    } else if (type === 'interests') {
      setSelectedTempTopicList([...data.interests]);
    }
  };

  const onChangeTopicValue = e => {
    setTopicValue(e.target.value);
    const updatedTopicList = standardTopicList.filter(
      value => value.TopicName.indexOf(e.target.value.toLowerCase()) !== -1
    );
    setTopicList(updatedTopicList);

    // on Create Button
    topicList.forEach(element => {
      if (e.target.value.length === 0 || element.TopicName === e.target.value) {
        setShowCreate(false);
      } else {
        setShowCreate(true);
      }
    });
  };

  const removeTopicValue = () => {
    setTopicValue('');
    setTopicList(standardTopicList);
  };

  /**
   *
   * @param {number} topicId
   * @param {string} topicName
   */
  const selectTopicToggle = (topicId, topicName) => {
    let overrapCount = 0;
    const tempArr = selectedTempTopicList;
    for (let i = 0; i < tempArr.length; i++) {
      if (tempArr[i].topicId === topicId) overrapCount++;
    }

    if (overrapCount === 0) {
      if (selectedTempTopicList.length === 20) return;
      setSelectedTempTopicList(prevState => [
        ...prevState,
        { topicId, topicName },
      ]);
    } else {
      deleteTopicTag(topicId);
    }
  };

  /**
   *
   * @param {number} topicId
   */
  const deleteTopicTag = topicId => {
    const tempArr = selectedTempTopicList;
    for (let i = 0; i < tempArr.length; i++) {
      if (tempArr[i].topicId === topicId) {
        tempArr.splice(i, 1);
      }
    }
    setSelectedTempTopicList([...tempArr]);
  };

  const clearAllTopicTag = () => setSelectedTempTopicList([]);

  /**
   *
   * @param {string} type
   */
  const submitTopicList = async type => {
    try {
      const postData = [
        /**
         * data[type] - topicId (X)
         * selectedTempTopicList - topicId (O)
         *
         * key - topicId
         *
         * postData.push(selectedTempTopicList)
         */
      ];
      const deleteData = [
        /**
         * data[type] - topicId (O)
         * selectedTempTopicList - topicId (X)
         *
         * key - id
         *
         * deleteData.push(data[type])
         */
      ];

      selectedTempTopicList.forEach(tempElement => {
        let count = 0;
        data[type].forEach(dataElement => {
          if (tempElement.topicId === dataElement.topicId) count++;
        });
        count === 0 ? postData.push({ id: tempElement.topicId }) : (count = 0);
      });

      data[type].forEach(dataElement => {
        let count = 0;
        selectedTempTopicList.forEach(tempElement => {
          if (dataElement.topicId === tempElement.topicId) count++;
        });
        count === 0 ? deleteData.push({ id: dataElement.id }) : (count = 0);
      });

      console.log('postData : ', postData);
      console.log('deleteData : ', deleteData);

      const postResponse = await axios({
        method: 'POST',
        url: `${USER_API}/users/me/${
          type === 'knowsAbout' ? 'knowsAbouts' : 'interests'
        }`,
        data:
          type === 'knowsAbout'
            ? { knowAboutInsert: postData }
            : { interestsInsert: postData },
        headers: { 'x-access-token': idToken },
      });

      const deleteResponse = await axios({
        method: 'DELETE',
        url: `${USER_API}/users/me/${
          type === 'knowsAbout' ? 'knowsAbouts' : 'interests'
        }`,
        data:
          type === 'knowsAbout'
            ? { knowAboutDelete: deleteData }
            : { interestsDelete: deleteData },
        headers: { 'x-access-token': idToken },
      });

      console.log('::Profile addTopicList postResponse::', postResponse);
      console.log('::Profile addTopicList deleteResponse::', deleteResponse);

      if (!postResponse.data.success) {
        throw new Error();
      } else if (!deleteResponse.data.success) {
        throw new Error();
      }

      // RERENDER page
      setChangeCount(prevChangeCount => prevChangeCount + 1);
      myPageChangeCount();

      // CLOSE modal
      setTopicToggle({
        type: '',
        toggleSwitch: false,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const getTopicsList = async () => {
    try {
      const response = await axios({
        method: 'GET',
        url: `${TOPIC_API}/search`,
      });
      response.data.topics.map(topic => {
        topic.topicId = topic.id;
        delete topic.id;
      });
      setTopicList([...response.data.topics]);
      setStandardTopicList([...response.data.topics]);
    } catch (error) {
      console.error(error);
    }
  };

  const createTopic = async () => {
    if (topicValue === '') return;
    try {
      const response = await axios({
        method: 'POST',
        url: `${TOPIC_API}`,
        data: { TopicName: topicValue },
        headers: { 'x-access-token': idToken },
      });

      const result = response.data.result.Topic;

      setStandardTopicList([
        ...standardTopicList,
        { TopicName: result.TopicName, topicId: result.id, PostCount: 0 },
      ]);
      setTopicList([...standardTopicList]);
      setSelectedTempTopicList([
        ...selectedTempTopicList,
        { topicId: result.id, topicName: result.TopicName },
      ]);
      setTopicValue('');

      /**
       * {
       *  id: number,
       *  TopicName: string
       * }
       */
    } catch (error) {
      console.error(error);
    }
  };

  const moveTopicDetail = topicName => {
    history.push(`/topic/${topicName}/articles`);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    targetElement = targetRef.current;
    getProfileData();
    // getLinkData();
    getTopicsList();
    return () => {
      clearAllBodyScrollLocks();
    };
  }, [changeCount]);

  return (
    <>
      {!data.isLoading && (
        <>
          {socialLinkToggle && (
            <NewSocialLinkModal
              onChangeToggleState={onChangeToggleState}
              socialLinkValue={data.urlLink}
              socialLinkData={data.url}
              addLink={addLink}
              removeLink={removeLink}
              removeAllLinkList={removeAllLinkList}
              onChangeSocialForm={onChangeSocialForm}
            />
            // <SocialLinkModal
            //   onChangeToggleState={onChangeToggleState}
            // />
          )}

          {topicToggle.toggleSwitch && (
            <TopicSettingModal
              type={topicToggle.type}
              topicValue={topicValue}
              topicList={topicList}
              dataKnowsAbout={data.knowsAbout}
              dataInterests={data.interests}
              selectedTempTopicList={selectedTempTopicList}
              onChangeTopicToggleState={onChangeTopicToggleState}
              onChangeTopicValue={onChangeTopicValue}
              removeTopicValue={removeTopicValue}
              selectTopicToggle={selectTopicToggle}
              deleteTopicTag={deleteTopicTag}
              submitTopicList={submitTopicList}
              clearAllTopicTag={clearAllTopicTag}
              createTopic={createTopic}
              showCreate={showCreate}
            />
          )}

          <Wrapper>
            <Title>Profile</Title>

            <SubtitleWrapper>
              <Subtitle>Knows About</Subtitle>
              <SocialLinkWrapper
                onClick={() => onChangeTopicToggleState('knowsAbout')}
              >
                {data.knowsAbout.length === 0
                  ? 'No Attributed Topics yet.'
                  : `${data.knowsAbout.length} Topics`}
                <EditIcon className="budy-edit-2" color={greyscales[800]} />
              </SocialLinkWrapper>
            </SubtitleWrapper>
            {data.knowsAbout ? (
              <TopicsWrapper>
                {data.knowsAbout.map((topic, i) => (
                  <Topic
                    topic={topic.topicName}
                    key={i}
                    onClick={() => moveTopicDetail(topic.topicName)}
                  />
                ))}
              </TopicsWrapper>
            ) : (
              <Message>No Attributed Topic yet.</Message>
            )}

            <SubtitleWrapper>
              <Subtitle>Interests</Subtitle>
              <SocialLinkWrapper
                onClick={() => onChangeTopicToggleState('interests')}
              >
                {data.interests.length === 0
                  ? 'No Attributed Topics yet.'
                  : `${data.interests.length} Topics`}
                <EditIcon className="budy-edit-2" color={greyscales[800]} />
              </SocialLinkWrapper>
            </SubtitleWrapper>
            {data.interests ? (
              <TopicsWrapper>
                {data.interests.map((topic, i) => (
                  <Topic
                    topic={topic.topicName}
                    key={i}
                    onClick={() => moveTopicDetail(topic.topicName)}
                  />
                ))}
              </TopicsWrapper>
            ) : (
              <Message>No Attributed Topic yet.</Message>
            )}

            <SubtitleWrapper>
              <Subtitle>Social Links</Subtitle>
              <SocialLinkWrapper onClick={onChangeToggleState}>
                {data.url.length === 0
                  ? 'No social links yet.'
                  : `${data.url.length} Links`}
                <EditIcon className="budy-edit-2" color={greyscales[800]} />
              </SocialLinkWrapper>
            </SubtitleWrapper>

            <SocialLinkIconWrapper>
              {data.url.map((link, i) => {
                if (linkChecker(link.Url) === 'medium') {
                  return (
                    <Medium
                      key={i}
                      color="#000000"
                      margin="14px 20px 0 0"
                      onClick={e => {
                        e.preventDefault();
                        if (link.Url.slice(0, 4) !== 'http') {
                          window.open(`http://${link.Url}`);
                        } else {
                          window.open(link.Url);
                        }
                      }}
                      linkUrl={link.Url}
                    />
                  );
                } else if (linkChecker(link.Url) === 'facebook') {
                  return (
                    <Facebook
                      key={i}
                      color="#356bc4"
                      margin="14px 20px 0 0"
                      onClick={e => {
                        e.preventDefault();
                        if (link.Url.slice(0, 4) !== 'http') {
                          window.open(`http://${link.Url}`);
                        } else {
                          window.open(link.Url);
                        }
                      }}
                      linkUrl={link.Url}
                    />
                  );
                } else if (linkChecker(link.Url) === 'youtube') {
                  return (
                    <Youtube
                      key={i}
                      color="#e62117"
                      margin="14px 20px 0 0"
                      onClick={e => {
                        e.preventDefault();
                        if (link.Url.slice(0, 4) !== 'http') {
                          window.open(`http://${link.Url}`);
                        } else {
                          window.open(link.Url);
                        }
                      }}
                      linkUrl={link.Url}
                    />
                  );
                } else if (linkChecker(link.Url) === 'twitter') {
                  return (
                    <Twitter
                      key={i}
                      color="#1da1fe"
                      margin="14px 20px 0 0"
                      onClick={e => {
                        e.preventDefault();
                        if (link.Url.slice(0, 4) !== 'http') {
                          window.open(`http://${link.Url}`);
                        } else {
                          window.open(link.Url);
                        }
                      }}
                      linkUrl={link.Url}
                    />
                  );
                } else {
                  return (
                    <Icon
                      key={i}
                      type="globe-outline"
                      size="20px"
                      cursor="pointer"
                      margin="14px 20px 0 0"
                      color={primary[500]}
                      onClick={e => {
                        e.preventDefault();
                        if (link.Url.slice(0, 4) !== 'http') {
                          window.open(`http://${link.Url}`);
                        } else {
                          window.open(link.Url);
                        }
                      }}
                      linkUrl={link.Url}
                    />
                  );
                }
              })}
            </SocialLinkIconWrapper>
          </Wrapper>
        </>
      )}
    </>
  );
};

// TODO: span OR div
const TopicWrapper = styled.span`
  padding: 4px 8px;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: normal;
  color: ${primary[500]};
  background-color: ${primary[100]};
  margin: 8px 2px 0 0;
  cursor: pointer;
`;

/**
 *
 * @param {string} topic
 */
const Topic = ({ topic, onClick }) => (
  <TopicWrapper onClick={onClick}>{topic}</TopicWrapper>
);

// const SocialIconWrapper = styled.div`
//   width: 40px;
//   height: 40px;
//   margin-right: 8px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   cursor: pointer;
// `;

// const Medium = ({ color, onClick }) => (
//   <SocialIconWrapper onClick={onClick}>
//     <MediumIcon
//       color={color ? '#000000' : 'rgba(0, 0, 0, 0.4)'}
//     />
//   </SocialIconWrapper>
// );

// const Facebook = ({ color, onClick }) => (
//   <SocialIconWrapper onClick={onClick}>
//     <FacebookIcon
//       color={color ? '#356bc4' : 'rgba(0, 0, 0, 0.4)'}
//     />
//   </SocialIconWrapper>
// );

// const Youtube = ({ color, onClick }) => (
//   <SocialIconWrapper onClick={onClick}>
//     <YoutubeIcon
//       color={color ? '#e62117' : 'rgba(0, 0, 0, 0.4)'}
//     />
//   </SocialIconWrapper>
// );

// const Twitter = ({ color, onClick }) => (
//   <SocialIconWrapper onClick={onClick}>
//     <TwitterIcon
//       color={color ? '#1da1fe' : 'rgba(0, 0, 0, 0.4)'}
//     />
//   </SocialIconWrapper>
// );

export default withRouter(Profile);
