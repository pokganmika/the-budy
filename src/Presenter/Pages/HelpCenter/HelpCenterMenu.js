const helpCenterCategories = [
  {
    title: 'Account & Preferences',
    key: 'account',
    url: '/helpcenter/account/main',
    sections: [
      {
        title: 'Getting Started',
        url: '/helpcenter/account/1',
        menus: [
          {
            title: 'Contact Budy Support',
            url: '/helpcenter/post/account_1_1',
            contents: [
              {
                type: 'block h1',
                content: 'Using Budy'
              }, 
              {
                type: 'block normal',
                content: [
                  {
                    type: 'linked',
                    content: 'Welcome to Medium! '
                  },
                  {
                    type: 'normal',
                    content: 'Medium is a publishing platform where people can read important, insightful stories on the topics that matter most to them and share.'
                  },
                  {
                    type: 'bold',
                    content: ' ideas with the world'
                  }
                ]
              }, 
              {
                type: 'block h3',
                content: 'Create your free account test'
              },
              {
                type: 'list',
                subtype: 'ordered',
                content: [
                  'ordered list', 'ordered list', 'ordered list', 'ordered list'
                ]
              },
              {
                type: 'list',
                subtype: 'bulleted',
                content: [
                  'bulleted list', 'bulleted list', 'bulleted list'
                ]
              },
              {
                type: 'block tip pink',
                content: 'Welcome to Medium! Medium is a publishing platform where people can read important, insightful stories on the topics that matter most to them and share ideas with the world.'
              }
            ]
          },
          {
            title: 'Using Budy',
            url: '/helpcenter/post/account_1_2',
            contents: [
              {
                type: 'block h1',
                content: 'Using Budy test'
              }
            ]
          },
          {
            title: 'Budy Glossary',
            url: '/helpcenter/post/account_1_3',
            contents: [
              {
                type: 'block h1',
                content: 'Budy Glossary test'
              }
            ]
          },
          {
            title: 'Supported browsers',
            url: '/helpcenter/post/account_1_4',
            contents: [
              {
                type: 'block h1',
                content: 'Supported browsers test'
              }
            ]
          }
        ]
      },
      {
        title: 'Login',
        url: '/helpcenter/account/2',
        menus: [
          {
            title: 'Login or sign up to Budy',
            url: '/helpcenter/post/account_2_1',
            contents: [
              {
                type: 'block h3',
                content: 'Login or sign up to Budy test'
              }
            ]
          },
          {
            title: 'Sign out of your account',
            url: '/helpcenter/post/account_2_2',
            contents: [
              {
                type: 'block h1',
                content: 'Sign out of your account test'
              }
            ]
          }
        ]
      },
      {
        title: 'Account settings',
        url: '/helpcenter/account/3',
        menus: [
          {
            title: 'Your profile page',
            url: '/helpcenter/post/account_3_1',
            contents: [
              {
                type: 'block h1',
                content: 'Your profile page test'
              }
            ]
          },
          {
            title: 'Adjust email preferences',
            url: '/helpcenter/post/account_3_2',
            contents: [
              {
                type: 'block h2',
                content: 'Adjust email preferences test'
              }
            ]
          },
          {
            title: 'Connect social media accounts',
            url: '/helpcenter/post/account_3_3',
            contents: [
              {
                type: 'block h1',
                content: 'Connect social media accounts test'
              }
            ]
          },
          {
            title: 'Change your username and Budy id',
            url: '/helpcenter/post/account_3_4',
            contents: [
              {
                type: 'block h1',
                content: 'Change your username and Budy id test'
              }
            ]
          },
          {
            title: 'Delete or deactivate your account',
            url: '/helpcenter/post/account_3_5',
            contents: [
              {
                type: 'block h1',
                content: 'Delete or deactivate your account test'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    title: 'Reading',
    key: 'reading',
    url: '/helpcenter/reading/main',
    sections: [
      {
        title: 'Navigating',
        url: '/helpcenter/reading/1',
        menus: [
          {
            title: 'Your homepage',
            url: '/helpcenter/post/reading_1_1',
            contents: [
              {
                type: 'block h1',
                content: 'Your homepage test'
              }
            ]
          },
          {
            title: 'Customize your interest and knows about',
            url: '/helpcenter/post/reading_1_2',
            contents: [
              {
                type: 'block h1',
                content: 'Customize your interest and knows about test'
              }
            ]
          },
          {
            title: 'Stored posts',
            url: '/helpcenter/post/reading_1_3',
            contents: [
              {
                type: 'block h1',
                content: 'Stored posts test'
              }
            ]
          },
          {
            title: 'Topics',
            url: '/helpcenter/post/reading_1_4',
            contents: [
              {
                type: 'block h1',
                content: 'Topics test'
              }
            ]
          }
        ]
      },
      {
        title: 'Reading',
        url: '/helpcenter/reading/2',
        menus: [
          {
            title: 'Votes',
            url: '/helpcenter/post/reading_2_1',
            contents: [
              {
                type: 'block h1',
                content: 'Votes test'
              }
            ]
          },
          {
            title: 'Share on social media',
            url: '/helpcenter/post/reading_2_2',
            contents: [
              {
                type: 'block h1',
                content: 'Share on social media test'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    title: 'Writing',
    key: 'writing',
    url: '/helpcenter/writing/main',
    sections: [
      {
        title: 'Managing posts',
        url: '/helpcenter/writing/1',
        menus: [
          {
            title: 'Tags',
            url: '/helpcenter/post/writing_1_1',
            contents: [
              {
                type: 'block h1',
                content: 'Tags test'
              }
            ]
          }
        ]
      },
      
      {
        title: 'Writing & editing',
        url: '/helpcenter/writing/2',
        menus: [
          {
            title: 'Write a post',
            url: '/helpcenter/post/writing_2_1',
            contents: [
              {
                type: 'block h1',
                content: 'Write a post test'
              }
            ]
          },
          {
            title: 'Edit a post',
            url: '/helpcenter/post/writing_2_2',
            contents: [
              {
                type: 'block h1',
                content: 'Edit a post test'
              }
            ]
          },
          {
            title: 'Format text',
            url: '/helpcenter/post/writing_2_3',
            contents: [
              {
                type: 'block h1',
                content: 'Format text test'
              }
            ]
          },
          {
            title: 'Images',
            url: '/helpcenter/post/writing_2_4',
            contents: [
              {
                type: 'block h1',
                content: 'Images test'
              }
            ]
          },
          {
            title: 'Embeds',
            url: '/helpcenter/post/writing_2_5',
            contents: [
              {
                type: 'block h1',
                content: 'Embeds test'
              }
            ]
          }
        ]
      },
      {
        title: 'Comments',
        url: '/helpcenter/writing/3',
        menus: [
          {
            title: 'Leaving Comment and Reply',
            url: '/helpcenter/post/writing_3_1',
            contents: [
              {
                type: 'block h1',
                content: 'Leaving Comment and Reply test'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    title: 'Policies & Safety',
    key: 'policy',
    url: '/helpcenter/policy/main',
    sections: [
      {
        title: 'Terms & policies',
        url: '/helpcenter/policy/1',
        menus: [
          {
            title: 'Terms of service',
            url: '/helpcenter/post/policy_1_1',
            contents: [
              {
                type: 'block h1',
                content: 'Terms of service test'
              }
            ]
          },
          {
            title: 'Budy Rules',
            url: '/helpcenter/post/policy_1_2',
            contents: [
              {
                type: 'block h1',
                content: 'Budy Rules test'
              }
            ]
          },
          {
            title: 'Privacy Policy',
            url: '/helpcenter/post/policy_1_3',
            contents: [
              {
                type: 'block h1',
                content: 'Privacy Policy test'
              }
            ]
          },
          {
            title: 'Partner Program Terms',
            url: '/helpcenter/helpcenter/post/policy_1_4',
            contents: [
              {
                type: 'block h1',
                content: 'Partner Program Terms test'
              }
            ]
          },
          {
            title: 'Username Policy',
            url: '/helpcenter/post/policy_1_5',
            contents: [
              {
                type: 'block h1',
                content: 'Username Policy test'
              }
            ]
          },
          {
            title: 'Copyright & DMCA Policy',
            url: '/helpcenter/post/policy_1_6',
            contents: [
              {
                type: 'block h1',
                content: 'Copyright & DMCA Policy test'
              }
            ]
          }
        ]
      },
      {
        title: 'Content',
        url: '/helpcenter/policy/2',
        menus: [
          {
            title: 'Budy Content Guidelines',
            url: '/helpcenter/post/policy_2_1',
            contents: [
              {
                type: 'block h1',
                content: 'Budy Content Guidelines test'
              }
            ]
          },
          {
            title: 'Budy Partner Program Terms',
            url: '/helpcenter/post/policy_2_2',
            contents: [
              {
                type: 'block h1',
                content: 'Budy Partner Program Terms test'
              }
            ]
          }
        ]
      },
      {
        title: 'Safety',
        url: '/helpcenter/policy/3',
        menus: [
          {
            title: 'Report Posts & Users',
            url: '/helpcenter/post/policy_3_1',
            contents: [
              {
                type: 'block h1',
                content: 'Report Posts & Users test'
              }
            ]
          },
          {
            title: 'Block a User',
            url: '/helpcenter/post/policy_3_2',
            contents: [
              {
                type: 'block h1',
                content: 'Block a User test'
              }
            ]
          },
          {
            title: 'Data Protection FAQ For European Users',
            url: '/helpcenter/post/policy_3_3',
            contents: [
              {
                type: 'block h1',
                content: 'Data Protection FAQ For European Users test'
              }
            ]
          },
          {
            title: 'Report copyright infringement',
            url: '/helpcenter/post/policy_3_4',
            contents: [
              {
                type: 'block h1',
                content: 'Report copyright infringement test'
              }
            ]
          },
          {
            title: 'Bug Bounty Disclosure Program',
            url: '/helpcenter/post/policy_3_5',
            contents: [
              {
                type: 'list',
                subtype: 'bulleted',
                content: [
                  'Bug Bounty Disclosure Program test', 'bulleted list', 'bulleted list'
                ]
              }
            ]
          }
        ]
      }
    ]
  }
]


export default helpCenterCategories;