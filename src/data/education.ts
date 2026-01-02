import { Company } from '../types';

export const educationData: Company[] = [
  {
    company: "Vellore Institute of Technology",
    logo: "education/vit.png",
    roles: [
      {
        title: "Bachelor of Technology, Information Technology",
        duration: "Jul 2019 - Jul 2023",
        content: [
          "9.42/10 CGPA",
          "Meritorious Scholarship and Dean's Rank holder list for consecutive years.",
          "Served as Event Manager and Editorial Core Committee Member in IEEE-WIE Chapter.",
          "Co-ordinated at the Technical fest Gravitas 2019.",
          "Contributed as Software Developer on SEDS-VIT Project for Vyadh - Mars Rover.",
        ],
        awards: "Graduated with Rank 5, Meritorious Student",
        techStack: ["Calculus for Engineers", "Discrete Mathematics and Graph Theory", "Applications of Differential and Difference Equations", "Applied Linear Algebra", "Human Computer Interaction", "Statistics for Engineers", "Data Mining Techniques", "Big Data Analytics", "Business Analytics", "Data Structures and Algorithms", "Theory of Computation", "Statistics and Probability"],
      },
    ],
  },
  {
    company: "Amity International School",
    logo: "education/amity.png",
    roles: [
      {
        title: "AISSCE - XII",
        duration: "2017 - 2018",
        content: [
          "95.2%, In the Top 2% students in the State.",
          "Served as Prefect Discipline Head displaying great management skills.",
          "Stood 3rd in Inter-School Web Development Competition.",
          "Active member of Ami-Tech Syndicate, Computer Society.",
          "Creative head in Editorial, Global Times publication.",
          "Lead Singer in Choir at the Annual Function.",
          "Bagged 1st position in Inter-School Singing Competition."
        ],
        awards: "Excellence in Academics",
        techStack: ["Mathematics", "Physics", "Chemistry", "Information Practices", "English"],
      },
      {
        title: "AISSCE - X",
        duration: "2015 - 2016",
        content: [
          "10/10 CGPA, Received Merit Letter from CBSE.",
          "Certified Abacus Gold Medalist, 2nd in the District.",
          "Served as Prefect Discipline Head displaying great management skills.",
          "Excellence in writing, Global Times publication.",
          "Part of the Yoga School Team, selected for Nationals.",
          "Involved in School's Choir Group and represented at States as Lead Singer.",
        ],
        awards: "Certificate of Merit - Government of Indian",
        techStack: ["Science", "Mathematics", "Social Studies", "English", "Hindi"],
      },
    ],
  },
].sort((a, b) => {
  const aDate = new Date(a.roles[0].duration.split(' - ')[1] || 'Present').getTime();
  const bDate = new Date(b.roles[0].duration.split(' - ')[1] || 'Present').getTime();
  return bDate - aDate;
});

