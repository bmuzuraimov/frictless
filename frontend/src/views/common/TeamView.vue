<template>
  <CommonLayout>
    <div class="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <v-breadcrumbs :items="items">
        <template v-slot:title="{ item }">
          {{ item.title }}
        </template>
      </v-breadcrumbs>
      <div class="max-w-screen-xl px-4 py-8 mx-auto lg:px-6 sm:py-16 lg:py-24">
        <div class="max-w-5xl">
          <h2 class="text-3xl font-extrabold leading-tight text-gray-900 sm:text-4xl">
            Our people make us great
          </h2>
          <p class="mt-4 text-base font-normal text-gray-500 sm:text-xl">
            Empower Developers, Designers, IT Ops, and business teams to collaborate at high
            velocity. Respond to changes and deliver great customer and employee service experiences
            fast.
          </p>
        </div>

        <div
          class="grid grid-cols-1 mt-12 gap-y-12 gap-x-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
        >
          <div v-for="member in current_team_members" :key="member.name">
            <img
              class="object-cover object-top w-full h-64 lg:h-48 rounded-lg"
              :src="member.picture"
              alt=""
            />
            <div class="mt-4 space-y-2">
              <div>
                <h3 class="text-xl font-bold text-gray-900">{{ member.name }}</h3>
                <p class="text-base font-medium text-gray-500">
                  {{ member.role }}
                </p>
              </div>
              <p class="text-base font-normal text-gray-500">
                {{ member.description }}
              </p>
              <ul class="flex items-center gap-3">
                <li v-for="social in member.socials" :key="social.name">
                  <a href="#" title="" class="">
                    <span class="sr-only"> {{ social.name }} </span>
                    <span v-html="social.icon"></span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div v-for="member in future_team_members" :key="member.name">
            <img
              class="object-cover object-top w-full h-64 lg:h-48 rounded-lg"
              :src="member.picture"
              alt=""
            />
            <div class="mt-4 space-y-2">
              <div>
                <a href="https://forms.gle/P2Yq7bDYcHSgQfAf6" target="_blank">
                  <h3 class="text-xl font-bold text-red-700">{{ member.name }}</h3></a
                >
                <p class="text-base font-medium text-green-700">
                  {{ member.role }}
                </p>
              </div>
              <div class="space-x-2">
                <v-chip
                  density="compact"
                  v-for="skill in member.skills"
                  :key="skill.text"
                  :color="skill.color"
                  >{{ skill.text }}</v-chip
                >
              </div>
            </div>
          </div>
        </div>

        <div class="max-w-3xl p-4 mx-auto mt-8 rounded-md lg:mt-12 bg-red-50">
          <div class="flex flex-col justify-between gap-3 md:gap-6 md:items-center md:flex-row">
            <div class="flex items-center gap-1.5">
              <svg
                aria-hidden="true"
                class="hidden w-5 h-5 text-red-800 md:block shrink-0"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"
                />
              </svg>
              <span class="text-base font-normal text-red-700">
                <span class="font-semibold"> Want to join be a part of us? </span>
                We are growing our community.
              </span>
            </div>

            <a
              href="https://forms.gle/P2Yq7bDYcHSgQfAf6"
              title=""
              class="inline-flex items-center text-base font-medium text-red-600 hover:underline"
            >
              Join our team
              <svg
                aria-hidden="true"
                class="w-5 h-5 ml-1.5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>

        <div class="mt-12 mb-4 text-center">
          <h2 class="text-3xl font-extrabold leading-tight text-gray-900 sm:text-4xl">
            Our Roadmap
          </h2>
        </div>
        <v-timeline align="start">
          <v-timeline-item
            v-for="(item, i) in roadmap_items"
            :key="i"
            :dot-color="item.color"
            :icon="item.icon"
            size="x-small"
          >
            <v-card>
              <v-card-title :class="['text-h6', `bg-${item.color}`]">
                {{ item.title }}
              </v-card-title>
              <v-card-text class="bg-white text--primary">
                <p>
                  {{ item.description }}
                </p>
                <v-btn :color="item.color" variant="outlined"> Button </v-btn>
              </v-card-text>
            </v-card>
          </v-timeline-item>
        </v-timeline>

        <!-- Funding Stage -->
        <div class="mt-12 mb-4 text-center">
          <h2 class="text-3xl font-extrabold leading-tight text-gray-900 sm:text-4xl">
            Funding Stage
          </h2>
        </div>
        <v-timeline class="my-10" direction="horizontal" line-inset="20">
          <v-timeline-item size="x-small" dot-color="cyan">
            <template v-slot:opposite> Bootstrapping </template>
            Now
          </v-timeline-item>

          <v-timeline-item size="x-small" dot-color="white">
            <template v-slot:opposite> HKBU Seed Funding </template>
            30,000HKD
          </v-timeline-item>

          <v-timeline-item size="x-small" dot-color="white">
            <template v-slot:opposite> 100,000HKD </template>
            HKSTP Incubation
          </v-timeline-item>
        </v-timeline>
      </div>
    </div>
  </CommonLayout>
</template>
<script lang="ts">
import CommonLayout from '@/views/layouts/CommonLayout.vue'
export default {
  components: {
    CommonLayout
  },
  data: () => ({
    items: [
      {
        title: 'Home',
        disabled: false,
        href: '/'
      },
      {
        title: 'Team',
        disabled: true,
        href: '/team'
      }
    ],
    current_team_members: [
      {
        picture: 'https://pbs.twimg.com/profile_images/1748543303187107840/kXV4zb50_400x400.jpg',
        name: 'Baiel Muzuraimov',
        role: 'Founder',
        description:
          'Baiel is a full-stack developer with over 3 years of experience in product development. He is the founder of Frictionless and has a passion for building great products.',
        socials: [
          {
            name: 'Linkedin',
            href: '#',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24" class="h-5 w-5 text-gray-600"><path fill="#52525B" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path></svg>'
          },
          {
            name: 'Twitter',
            href: '#',
            icon: '<svg width="300" height="300" viewBox="0 0 300 300" version="1.1" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-600"><path stroke="currentColor" d="M178.57 127.15 290.27 0h-26.46l-97.03 110.38L89.34 0H0l117.13 166.93L0 300.25h26.46l102.4-116.59 81.8 116.59h89.34M36.01 19.54H76.66l187.13 262.13h-40.66"></path></svg>'
          },
          {
            name: 'GitHub',
            href: '#',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24" class="h-5 w-5 text-gray-600"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path></svg>'
          }
        ]
      }
    ],
    future_team_members: [
      {
        picture: 'https://blog.talentgarden.com/hubfs/blog-images/figma-logo.png',
        name: 'Join our team',
        role: 'UI/UX Designer',
        skills: [
          {
            text: 'Figma',
            color: 'grey'
          },
          {
            text: 'Web Animation'
          },
          {
            text: 'Javascript',
            color: 'orange'
          },
          {
            text: 'Scrum',
            color: 'black'
          }
        ]
      },
      {
        picture:
          'https://bs-uploads.toptal.io/blackfish-uploads/components/blog_post_page/content/cover_image_file/cover_image/1128021/retina_1708x683_image_0-557558de653d069c7d62531a37e64c97-43e4ac0eff414b8d917c007af3df11b1.png',
        name: 'Join our team',
        role: 'Frontend Developer',
        skills: [
          {
            text: 'Vue.js',
            color: 'green'
          },
          {
            text: 'Typescript',
            color: 'blue'
          },
          {
            text: 'Tailwind',
            color: 'blue'
          },
          {
            text: 'Scrum',
            color: 'black'
          }
        ]
      },
      {
        picture:
          'https://ik.imagekit.io/ably/ghost/prod/2023/11/best-nodejs-realtime-frameworks.png?tr=w-1728,q-50',
        name: 'Join our team',
        role: 'Backend Developer',
        skills: [
          {
            text: 'Express.js',
            color: 'green'
          },
          {
            text: 'AWS',
            color: 'purple'
          },
          {
            text: 'Docker',
            color: 'blue'
          },
          {
            text: 'Scrum',
            color: 'black'
          }
        ]
      },
      {
        picture:
          'data:image/jpeg;base64,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',
        name: 'Join our team',
        role: 'Testing Engineer',
        skills: [
          {
            text: 'Jest',
            color: 'grey'
          },
          {
            text: 'Cypress',
            color: 'brown'
          },
          {
            text: 'Selenium',
            color: 'blue'
          },
          {
            text: 'Scrum',
            color: 'black'
          }
        ]
      },
      {
        picture:
          'https://images.ctfassets.net/23aumh6u8s0i/6uBzrqHNLlSAoER6HtgDN0/accd8f871b1de37f472b94da4346afa2/python-hero',
        name: 'Join our team',
        role: 'Python Developer',
        skills: [
          {
            text: 'Python OOP',
            color: 'grey'
          },
          {
            text: 'Unit Testing',
            color: 'brown'
          },
          {
            text: 'AWS',
            color: 'blue'
          },
          {
            text: 'Scrum',
            color: 'black'
          }
        ]
      },
      {
        picture:
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAflBMVEX///8AAAC8vLw8PDx1dXW+vr4qKiqwsLDJycn8/Pzs7Ozj4+Pm5ub09PTx8fHV1dW2traJiYmQkJDb29upqamWlpZ7e3uhoaHX19dXV1dLS0sXFxdgYGA2NjZ2dnbDw8NFRUVtbW2Dg4MfHx9kZGRISEgoKCgODg6bm5swMDCkwdw7AAAHMUlEQVR4nO2d23aqMBBAQbBclTsIYgVLvfz/Dx617SmEDFUhAbJmP3YB4y4Kw5BkJAlBEARBEARBEARBEARBEARBEARBEARBEAQRhJUd6Isw8sp0d5JvfL5r5tgfqi+m5Szdsxfn2ZtMJ9PH/ozPsrIC3Q39Q5kpW0CKoLDG/sx/YZiBs9QS7z1XoBP1B97YCi2MleVcT1QUl9nlwRPVzZs9ttL1y2cG+jI8e2X+6JfvOcJxtNa6m/hxlX6wcCLIVvz9Eh5iNfac/XR2KtuiUj3fKz+Jv6tcBReDOn3sUvVwDl19Y6+MWpSN19jsFPATtPs6bXdZGfuhu3eshlOLpLGbz0tQyl+QuhR57CXa0gnMTieCdVY/iMIpjTMfPFFFqnqRttADu8+V8Nw4qDaYRRchKLVLq0OULPaOvR4uXHCqh0if+Qa8yntTq/QT7fqDeurL9xxlIx6HZLxxHX9nH0+S3IZizDyeUg/H5xJuNmJ+sA7aiJYyDvZD894YsQ3WMJQvA15UumimUQXTqE1DWXZYBvvFSBtRXYahSEP5zDBYneZtKmd38W4ZyhWzWE2sYyMss/tG21A+8qqKxY2wB0ZRKIZc7sN3munGkU2dimrI+gJ+ZbW2HD0mwjIpcNANB78zGms70PduEnlq9VMlppAPHPYGYChv+/0YV6bl7Bfh2T9UafFEjaRnWBqQoSwvnziKYVqBvtAS31PTDD5FjzD43R82lEvwSdBYWYGzdMPIi6tMOcKHeIGMo+E18dfvkoaxvteFEy9WU+Wt1yn6m6FLxp2GdxgLtXjm1zGMIW8WaIiGUzP8UPKq8QZo5obbNyVVYz8JXd0JzP8V5HrtZl6G212Rqwc/0e5CBvwQWCukTtpwq3x+CS30zXMVSWOahicly1XPT9ynhbo+x4iGJyWtVC9K3KW+sYeuGZfjGZbh/iq0Zv3e9vdhmLPhjlN5UVLHMuQ2kGksQxbP3HTGMuRVPB3PkGUtuslYhkNHg0HD10FDXqDh6/AzXJn2Rl9qt7J3nu7IkaazNnTLbNc+NPESb/KGpgUNOLCBQarE4L3JGRpra6O72m3kevFdxacrGtChifdMEzK0vexCfdXyRj1+BBx5S2w3HcME3pg62jCjbppG5AP0ZAw7B6PS3uG2rzGqTnskm4xh50uMHeX4pu5G72n9akMfAj0Vw6Bz666Hrd+N6G9epmLodm7dVRKYi+FfY8ILMM5cDCXDvs11isCpJuBoitkYfnMB94Bqc3MzhOd1fQJ7iGMIDU8XyFCmV8dFMqQPpxLJkL6TUIbU76lYhrQxuGIZ0pJrwQzl9utT0QzL1h4zNqSPTGyNo56xoUY/n+QeMzZ0Heqe5IytGRtqtQ9Xh5h8M2tDekmUKBfO2hB48m/OEJm3oZRSd94IZLim7twogs/cEJgvXS+Cz90QOEytCD57Q4u6+0UgQ8mn7v87Q2z+hhJ9ctP/6SECGNKTN0UgQyB5SwQyBN5nm+IYSkvqIT4FMgSSt1AgQ3ry9vWyRgxDIHlLBTIEjuYKZEhP3m5FcFEMgeQtF8gQSN6WAhnSkze5lg7M3ZBcWuubUiBDcDCiMIZA8iaSIZC8iWQIJG8CGXasVCiKYfdBhTAEkjeBDIHkTSRDIHkTyRBI3gQyBJK3MQwrRoZw8sbbsOua0MdQ2k/FsHu58h6G4CLTvA0l4HP0N4SSN+6G5Mp+gxlCyRt3w878o5ehVEzDUCr7GXZM2acvaM/fsOth5wFDr2PVE+rUPP6GXRPuHhqb+KFq0ARSWvI2giHwe3nY8E4a0SxpP/IxDOHvKTWaE1FTPeqqrpSpYGMYwrf9djQXTPPoKzq2cybe8w+/8FqfA4gG3z2hTk5ECp4DP1nWhsB03VY0uKEJ3KqqfkH1wKU7mRuuHjME0pSd17WMs+3dp7plftd678wNgUdWuuFRyar4EIXfC889sq7ZnxuxN6TfFcloK4vV2l8cDKnPwuyikbBbr60GZeorP8OKR0zKhZKfYcElZjsB4WfIKWbrfs7NUOcVk1zFgpvhhVdMMgfnZGgr/GISOTjTvmHGfeEoN/EUrv/V5rPAkA3ubu0SvrsL5JkCL5Iy9JrsLZr97V4/zsoOnP1tnaWDmhbPtEtg3iClWY5/tDnSbd0oZ6mFZy8uezYXYN8zOPg7nnHvoXJbe+2gVsCyUS/DXJB8RFL39nptBtefUJhEcVlljLs/cGnG1P0+ijF8+hRxbp5bh1Nzu97dV1/mwqOr5Y1hO+g+DpcWk18cRtD7gOtULODWFWJXpOXBSzSd19roPwDFt95slSyPvSh0l04wZJPaF9gMY3TMrqfIT7SlzrRD7Uu81JB8u0urd/8cuns9MNcTM2pBtGCkcXorqvIQfZ0i5v0TGKAR15vTUUnL2CO7xMyaleOGYXjrMW5N/juHIAiCIAiCIAiCIAiCIAiCIAiCIAiCzJV/YU10pQm4C4IAAAAASUVORK5CYII=',
        name: 'Join our team',
        role: 'Notion Designer',
        skills: [
          {
            text: 'Notion',
            color: 'cyan'
          },
          {
            text: 'User Experience',
            color: 'brown'
          },
          {
            text: 'User Interface',
            color: 'purple'
          },
          {
            text: 'Scrum',
            color: 'black'
          }
        ]
      },
      {
        picture:
          'data:image/jpeg;base64,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',
        name: 'Join our team',
        role: 'Marketing Manager',
        skills: [
          {
            text: 'Marketing Strategy',
            color: 'blue'
          },
          {
            text: 'Project Management',
            color: 'magenta'
          }
        ]
      },
      {
        picture: 'https://businessinthenews.co.uk/wp-content/uploads/2022/06/seo2.png',
        name: 'Join our team',
        role: 'SEO Specialist',
        skills: [
          {
            text: 'SEO Optimization',
            color: 'orange'
          },
          {
            text: 'Google Analytics',
            color: 'red'
          }
        ]
      },
      {
        picture:
          'https://st3.depositphotos.com/35925452/37203/i/450/depositphotos_372032638-stock-photo-a-man-typing-the-contract.jpg',
        name: 'Join our team',
        role: 'Content Writer',
        skills: [
          {
            text: 'Content Creation',
            color: 'green'
          },
          {
            text: 'Copywriting',
            color: 'teal'
          },
          {
            text: 'Proofreading',
            color: 'indigo'
          }
        ]
      }
    ],
    roadmap_items: [
      {
        color: 'white',
        icon: 'mdi-star',
        title: 'Market Research and Validation',
        description:
          'Conduct thorough market research to identify your target market and validate the demand for your product. Gather insights on customer needs, pain points, and preferences. Refine your value proposition based on market feedback.'
      },
      {
        color: 'white',
        icon: 'mdi-book-variant',
        title: 'Product Refinement and MVP Launch',
        description:
          'Iterate and improve your prototype based on market research findings. Incorporate user feedback to enhance the functionality, user experience, and performance of your product. Launch a minimum viable product (MVP) to gather real-world user feedback.'
      },
      {
        color: 'white',
        icon: 'mdi-airballoon',
        title: 'User Acquisition and Marketing Strategy',
        description:
          'Develop a comprehensive user acquisition plan to attract your target audience. Create a marketing strategy that includes online channels, content marketing, social media, and SEO. Implement lead generation tactics and optimize your website for conversions.'
      },
      {
        color: 'white',
        icon: 'mdi-layers-triple',
        title: 'Customer Engagement and Retention',
        description:
          'Focus on customer engagement and retention to build long-term relationships with your users. Leverage email marketing, social media, and customer support to provide value and support to your customers. Implement loyalty programs and referral incentives to encourage repeat business.'
      }
    ]
  })
}
</script>
