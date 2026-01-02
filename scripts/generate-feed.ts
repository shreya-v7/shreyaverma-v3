import { Feed } from "feed";
import { writeFileSync } from "fs";
import { join } from "path";
import { metaData } from "../src/config/config";

const BaseUrl = metaData.baseUrl.endsWith("/")
  ? metaData.baseUrl
  : `${metaData.baseUrl}/`;

const feed = new Feed({
  title: metaData.title,
  description: metaData.description,
  id: BaseUrl,
  link: BaseUrl,
  copyright: `All rights reserved ${new Date().getFullYear()}, ${
    metaData.title
  }`,
  generator: "Feed for Node.js",
  feedLinks: {
    json: `${BaseUrl}feed.json`,
    atom: `${BaseUrl}atom.xml`,
  },
});

// Generate feed files
const distDir = join(process.cwd(), "dist");
const atomContent = feed.atom1();
const jsonContent = feed.json1();

writeFileSync(join(distDir, "atom.xml"), atomContent);
writeFileSync(join(distDir, "feed.json"), jsonContent);

console.log("Feed files generated successfully!");

