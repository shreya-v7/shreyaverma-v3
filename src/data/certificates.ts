import { Certificate } from '../types';

export const certificates: Certificate[] = [
  {
    title: "Google Cloud Professional Machine Learning Engineer Certification",
    date: "Dec 2023",
    image: "/certs/googleml.png",
  },
  {
    title: "Microsoft Azure Fundamentals, AZ - 900",
    date: "Dec 2023",
    image: "/certs/az900.png",
  },
  {
    title: "Deep Learning Specialization, Deep Learning.AI",
    date: "Dec 2022",
    image: "/certs/andrewngdl.png",
  },
  {
    title: "Winner of ET Campus Coding Stars",
    date: "Aug 2022",
    image: "/certs/et.png",
  },
  {
    title: "Gold Certified AI Foundation, SkillUp",
    date: "Aug 2021",
    image: "/certs/aifsgold.png",
  },
  {
    title: "Mass AI Workshop Participation, Guinness Book of World Records, GUVI",
    date: "Apr 2021",
    image: "/certs/guvi.png",
  },
].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

