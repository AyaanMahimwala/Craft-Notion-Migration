import * as React from "react";
import * as ReactDOM from "react-dom";
import craftXIconSrc from "./craftx-icon.png";

const App: React.FC<{}> = () => {
  const isDarkMode = useCraftDarkMode();

  React.useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <img className="icon" src={craftXIconSrc} alt="CraftX logo" />
      <button
        className={`btn ${isDarkMode ? "dark" : ""}`}
        onClick={insertHelloWorld}
      >
        Print markdown in console
      </button>
    </div>
  );
};

function useCraftDarkMode() {
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  React.useEffect(() => {
    craft.env.setListener((env) => setIsDarkMode(env.colorScheme === "dark"));
  }, []);

  return isDarkMode;
}

async function insertHelloWorld() {
  const result = await craft.dataApi.getCurrentPage();

  if (result.status !== "success") {
    throw new Error(result.message);
  }

  const pageBlock = result.data;
  // Concatenate the text runs together to get the page title
  const pageTitle = pageBlock.content.map((x) => x.text).join();
  console.log(pageTitle);

  const markdown = craft.markdown.craftBlockToMarkdown(
    result.data.subblocks,
    "common",
    {
      tableSupported: true,
    }
  );

  console.log(markdown);

  // const block = craft.blockFactory.textBlock({
  //   content: "Hello world!",
  // });

  // craft.dataApi.addBlocks([block]);
}

export function initApp() {
  ReactDOM.render(<App />, document.getElementById("react-root"));
}
