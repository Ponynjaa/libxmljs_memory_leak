import * as libxmljs from "libxmljs";
import * as fsp from "fs/promises";

const xml = await fsp.readFile("./banana.xml");

console.log("Memory usage at the start: ", process.memoryUsage().rss / 1_000_000 + "MB");

for (let i = 0; i < 5000; i++) {
	// parse xml
	const document = libxmljs.parseXml(xml.toString('utf-8'));
	const root = document.root();

	// do some operation with the parsed xml
	const nodes = root.find("//text()[contains(., '🍌')]");
	for (const node of nodes) {
		const text = node.text();
		const newText = text.replace(/🍌/g, "🍎");
		node.text(newText);
	}
}

console.log("Memory usage at the end: ", process.memoryUsage().rss / 1_000_000 + "MB");
