import { Logo } from "@/once-ui/components";

const person = {
  firstName: "Amin",
  lastName: "Senator",
  get name() {
    return `${this.firstName} ${this.lastName}`;
  },
  role: "Developer",
  avatar: "/images/projects/project-01/12.gif",
  email: "aminmohamadbiabani713@gmail.com",
  location: "Asia/Tehran", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
  languages: ["English", "Persian"], // optional: Leave the array empty if you don't want to display languages
};

const newsletter = {
  display: true,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: (
    <>
      I occasionally write about design, technology, and share thoughts on the intersection of
      creativity and engineering.
    </>
  ),
};

const social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  {
    name: "Telegram",
    icon: "telegram",
    link: "https://t.me/Amin_mp3",
  },
  {
    name: "Discord",
    icon: "discord",
    link: "https://discord.com/users/852854475080073267",
  },
  {
    name: "X",
    icon: "x",
    link: "",
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
  },
];

const home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: "Say Hi",
  featured: {
    display: true,
    title: <>Recent project: <strong className="ml-4">WebPoosh</strong></>,
    href: "https://www.webpoosh.com/",
  },
  subline: (
    <>
     I am Amin, a design engineer at National Skill University, where I work intuitively on user experiences after hours building my own projects.
    </>
  ),
};

const about = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, ${person.role} from ${person.location}`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: true,
    link: "https://cal.com/amin-senator",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        Amin is a design engineer from Rasht with a passion for transforming complex challenges into simple and beautiful design solutions. His work encompasses digital interfaces, interactive experiences, and the convergence of design and technology.
      </>
    ),
  },
  work: {
    display: true, // set to false to hide this section
    title: "Work Experience",
    experiences: [
      {
        company: "Html/Css",
        timeframe: "2020 - 2021",
        role: "Senior Developer",
        achievements: [
          <>
            With HTML and CSS, you can build a whole world from a blank page. 🌍💻
          </>,
        ],
        images: [
          // optional: leave the array empty if you don't want to display images
          {
            src: "/images/projects/project-01/html-css-750x375.jpg",
            alt: "Once UI Project",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        company: "javascript",
        timeframe: "2022 - 2023",
        role: "Senior Developer",
        achievements: [
          <>
           JavaScript turns ideas into interaction — it's the magic behind the web. ✨💡
          </>,
        ],
        images: [
          {
            src: "/images/projects/project-01/jsheader.png",
            alt: "Once UI Project",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        company: "Discord",
        timeframe: "2021 - 2025",
        role: "Senior Developer",
        achievements: [
          <>
With Discord.js, you're not just building bots — you're creating communities, one command at a time. 🤖💬
</>,
        ],
        images: [
          {
            src: "/images/projects/project-01/background.png",
            alt: "Once UI Project",
            width: 16,
            height: 9,
          },
        ],
      },
    ],
  },
  studies: {
    display: true, // set to false to hide this section
    title: "Studies",
    role: "Lead Designer",
    institutions: [
      {
        name: "University of National Skill",
        description: <>Studied software engineering.</>,
      },
      {
        name: "Build the Future",
        description: <>Studied online marketing and personal branding.</>,
      },
    ],
  },
  technical: {
    display: true, // set to false to hide this section
    title: "Technical skills",
    skills: [
      {
        title: "Figma",
        description: <>Able to prototype in Figma with Once UI with unnatural speed.</>,
        // optional: leave the array empty if you don't want to display images
        images: [
          {
            src: "/images/projects/project-01/cover-02.jpg",
            alt: "Project image",
            width: 16,
            height: 9,
          },
          {
            src: "/images/projects/project-01/cover-03.jpg",
            alt: "Project image",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        title: "Next.js",
        description: <>Building next gen apps with Next.js + Once UI + Supabase.</>,
        // optional: leave the array empty if you don't want to display images
        images: [
          {
            src: "/images/projects/project-01/cover-04.jpg",
            alt: "Project image",
            width: 16,
            height: 9,
          },
        ],
      },
    ],
  },
};

const blog = {
  path: "/blog",
  label: "Blog",
  title: "Writing about design and tech...",
  description: `Read what ${person.name} has been up to recently`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work = {
  path: "/work",
  label: "Work",
  title: `Projects – ${person.name}`,
  description: `Design and dev projects by ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

const gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Photo gallery – ${person.name}`,
  description: `A photo collection by ${person.name}`,
  // Images by https://lorant.one
  // These are placeholder images, replace with your own
  images: [
    {
      src: "/images/gallery/horizontal-1.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-2.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-3.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-4.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-1.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-2.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-3.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-4.jpg",
      alt: "image",
      orientation: "vertical",
    },
  ],
};

export { person, social, newsletter, home, about, blog, work, gallery };
