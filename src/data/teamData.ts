/**
 * CODEXTECH TEAM MEMBERS DATA
 * 
 * ============================================================================
 * VERIFIED TEAM ROSTER (MANDATORY EXACT ORDER):
 * 1. Sumit Kumar Panigrahi — Founder & Team Lead (Male voice, sumit-leader.jpg)
 * 2. Siriparapu Ritesh Kumar — Business & Strategy Lead (Male voice, ritesh.jpg)
 * 3. Priyanshu Behura — Frontend Development (Male voice, priyanshu.jpg)
 * 4. Pranab Kumar Jena — AI/ML & Emerging Technologies (Male voice, pranab.jpg)
 * 5. Supriya Panda — Research & Technical Communication (Female voice, supriya.jpg)
 * 6. Adity Kumari — Frontend Developer & Technical Communication (Female voice, adity.jpg)
 * 
 * PRONUNCIATION RULES:
 * - Brand name is spoken as "Code X Tech" in audio while visual brand remains "CODEXTECH".
 * - Adity's name is spoken as "Aditi" in audio while visual display remains "Adity Kumari".
 * ============================================================================
 */

import type { TeamMember } from '../types';

export const teamMembers: TeamMember[] = [
  {
    id: 'sumit-kumar-panigrahi',
    name: 'Sumit Kumar Panigrahi',
    role: 'Founder & Team Lead',
    isLeader: true,
    gender: 'male',
    photoUrl: '/assets/team/sumit-leader.jpg',
    introScript:
      "Hey, I'm Sumit, Founder and Team Leader of CODEXTECH. I turn ideas into innovation and challenges into solutions. Welcome to my world!",
    introSentences: [
      "Hey, I'm Sumit, Founder and Team Leader of CODEXTECH.",
      "I turn ideas into innovation and challenges into solutions.",
      "Welcome to my world!",
    ],
    spokenSentences: [
      "Hey, I'm Sumit, Founder and Team Leader of Code X Tech.",
      "I turn ideas into innovation and challenges into solutions.",
      "Welcome to my world!",
    ],
    bio: "I'm a B.Tech student passionate about full-stack development, AI engineering, and solving real-world problems through technology. I enjoy building web applications, researching ideas, exploring different approaches, and finding effective solutions to technical challenges.\n\nI'm currently strengthening my problem-solving skills through Data Structures and Algorithms in Java while learning modern web technologies and exploring how AI can be integrated into practical applications. I also enjoy researching new technologies, planning project approaches, and turning innovative ideas into useful digital solutions.\n\nAs the founder and team lead of CODEXTECH, I enjoy collaborating with my team, guiding project development, exploring creative solutions, and continuously improving my technical and leadership skills. My goal is to build meaningful products that combine innovation, functionality, and real-world impact.",
    skills: [
      'Full-Stack Development',
      'AI Engineering',
      'Technical Research',
      'Problem-Solving',
      'Java',
      'DSA',
      'Project Planning',
    ],
    socialLinks: {
      linkedin: 'https://www.linkedin.com/in/sumit-kumar-panigrahi-003b6235b/',
      github: '',
      email: '',
    },
  },
  {
    id: 'siriparapu-ritesh-kumar',
    name: 'Siriparapu Ritesh Kumar',
    role: 'Business & Strategy Lead',
    gender: 'male',
    photoUrl: '/assets/team/ritesh.jpg',
    introScript:
      "Hey, I'm Ritesh, leading business and strategy at CODEXTECH. Let's turn ideas into opportunities!",
    introSentences: [
      "Hey, I'm Ritesh, leading business and strategy at CODEXTECH.",
      "Let's turn ideas into opportunities!",
    ],
    spokenSentences: [
      "Hey, I'm Ritesh, leading business and strategy at Code X Tech.",
      "Let's turn ideas into opportunities!",
    ],
    bio: "I'm a B.Tech student interested in Artificial Intelligence, business strategy, and solving real-world problems through technology. I enjoy exploring ideas that combine technical innovation with practical value.\n\nMy experience contributing to my family's business has helped me understand customer needs, business operations, decision-making, and taking ownership of responsibilities. I also enjoy participating in projects and hackathons, where I can collaborate with others, strengthen my analytical skills, and learn how to turn ideas into practical solutions.\n\nI'm interested in understanding the problems people face, exploring possible approaches, and helping connect business needs with technology-driven solutions. I'm looking forward to learning from new experiences and collaborating on projects that create meaningful impact.",
    skills: [
      'Business Strategy',
      'AI',
      'Customer Understanding',
      'Operations',
      'Problem-Solving',
      'Team Collaboration',
    ],
    socialLinks: {
      linkedin: 'https://www.linkedin.com/in/siriparapu-ritesh-kumar-56a44a390/',
      github: '',
      email: '',
    },
  },
  {
    id: 'priyanshu-behura',
    name: 'Priyanshu Behura',
    role: 'Frontend Development',
    gender: 'male',
    photoUrl: '/assets/team/priyanshu.jpg',
    introScript:
      "Hey, I'm Priyanshu, crafting interactive digital experiences through frontend development. Welcome to my space!",
    introSentences: [
      "Hey, I'm Priyanshu, crafting interactive digital experiences through frontend development.",
      "Welcome to my space!",
    ],
    spokenSentences: [
      "Hey, I'm Priyanshu, crafting interactive digital experiences through frontend development.",
      "Welcome to my space!",
    ],
    bio: "I'm a B.Tech student interested in frontend development and building interactive, user-friendly web applications. I enjoy exploring how websites can combine attractive interfaces with smooth functionality to create better user experiences.\n\nI'm interested in learning modern web technologies, improving my development skills, and contributing to collaborative projects. Through CODEXTECH, I look forward to turning ideas into practical web experiences, working closely with my teammates, and continuously developing my technical abilities.\n\nI believe that consistent practice, experimentation, and collaboration are important parts of becoming a better developer. I'm eager to take on new challenges, learn from every project, and contribute to building useful digital products.",
    skills: [
      'Frontend Development',
      'Web Technologies',
      'User Experience',
      'Collaborative Project Development',
    ],
    socialLinks: {
      linkedin: 'https://www.linkedin.com/in/priyanshu-behura-0b38bb378/',
      github: '',
      email: '',
    },
  },
  {
    id: 'pranab-kumar-jena',
    name: 'Pranab Kumar Jena',
    role: 'AI/ML & Emerging Technologies',
    gender: 'male',
    photoUrl: '/assets/team/pranab.jpg',
    introScript:
      "Hey, I'm Pranab, exploring AI, machine learning, and the technology shaping tomorrow. Let's innovate!",
    introSentences: [
      "Hey, I'm Pranab, exploring AI, machine learning, and the technology shaping tomorrow.",
      "Let's innovate!",
    ],
    spokenSentences: [
      "Hey, I'm Pranab, exploring AI, machine learning, and the technology shaping tomorrow.",
      "Let's innovate!",
    ],
    bio: "I'm a B.Tech student interested in Artificial Intelligence, Machine Learning, and emerging technologies. I enjoy exploring new technical concepts, researching possible solutions, and understanding how innovative technologies can be applied to practical problems.\n\nI also enjoy preparing for hackathons by studying our project concepts, exploring technical approaches, and working with my teammates to develop clear and well-supported responses to judges' questions. I believe that thorough preparation, technical understanding, and teamwork are essential for presenting ideas confidently and building effective solutions.\n\nI'm continuously looking to expand my knowledge of AI and emerging technologies, strengthen my analytical thinking, and contribute to projects that explore new possibilities through technology.",
    skills: [
      'AI/ML Exploration',
      'Technical Research',
      'Emerging Technologies',
      'Hackathon Preparation',
      'Problem-Solving',
    ],
    socialLinks: {
      linkedin: 'https://www.linkedin.com/in/pranab-kumar-jena-395541406/',
      github: '',
      email: '',
    },
  },
  {
    id: 'supriya-panda',
    name: 'Supriya Panda',
    role: 'Research & Technical Communication',
    gender: 'female',
    photoUrl: '/assets/team/supriya.jpg',
    introScript:
      "Hey, I'm Supriya, bringing research and ideas together to create meaningful solutions. Welcome to my profile!",
    introSentences: [
      "Hey, I'm Supriya, bringing research and ideas together to create meaningful solutions.",
      "Welcome to my profile!",
    ],
    spokenSentences: [
      "Hey, I'm Supriya, bringing research and ideas together to create meaningful solutions.",
      "Welcome to my profile!",
    ],
    bio: "I'm a B.Tech student at Gandhi Institute for Technology, Bhubaneswar, who enjoys learning, exploring ideas, and working collaboratively to solve problems. I'm interested in researching topics, organizing information, and making complex ideas easier to understand.\n\nI value the role that research and preparation play in developing effective solutions. I aim to contribute by exploring relevant information, helping structure project concepts, and supporting clear communication when presenting ideas. I also enjoy learning from my teammates, sharing perspectives, and improving my ability to communicate information in a meaningful way.\n\nI'm looking forward to developing my skills, gaining new experiences, and contributing to collaborative projects that turn thoughtful ideas into practical outcomes.",
    skills: [
      'Research',
      'Information Gathering',
      'Documentation',
      'Technical Communication',
      'Team Collaboration',
    ],
    socialLinks: {
      linkedin: 'https://www.linkedin.com/in/supriya-panda-85801a311/',
      github: '',
      email: '',
    },
  },
  {
    id: 'adity-kumari',
    name: 'Adity Kumari',
    role: 'Frontend Developer & Technical Communication',
    gender: 'female',
    photoUrl: '/assets/team/adity.jpg',
    introScript:
      "Hey, I'm Adity, building engaging web experiences and bringing ideas to life. Welcome to my profile!",
    introSentences: [
      "Hey, I'm Adity, building engaging web experiences and bringing ideas to life.",
      "Welcome to my profile!",
    ],
    spokenSentences: [
      "Hey, I'm Aditi, building engaging web experiences and bringing ideas to life.",
      "Welcome to my profile!",
    ],
    bio: "I'm a B.Tech CSE (AI) student at Gandhi Institute for Technology, Bhubaneswar, with an interest in frontend development and creating engaging web experiences. I enjoy building responsive interfaces and using web technologies to make websites interactive, accessible, and user-friendly.\n\nMy technical interests include React, HTML, CSS, JavaScript, Bootstrap, DOM, and JSON. Alongside development, I enjoy discussing our project ideas and helping communicate our solutions during hackathons. When judges ask technical questions, I contribute to answering them by explaining our approach and helping present our ideas clearly.\n\nI'm continuously working to strengthen my development skills, improve my technical communication, and collaborate effectively with my teammates to build better digital experiences.",
    skills: [
      'React',
      'HTML',
      'CSS',
      'JavaScript',
      'Bootstrap',
      'DOM',
      'JSON',
      'Frontend Development',
      'Technical Communication',
    ],
    socialLinks: {
      linkedin: 'https://www.linkedin.com/in/adity-kumari/',
      github: '',
      email: '',
    },
  },
];
