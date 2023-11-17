import Title from "../../components/Title";
import Header from "../../components/Header";
import { FiSettings } from "react-icons/fi";
import "./prompts.css";
import { useState } from "react";
import OpenAI from 'openai';


const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export default function Prompts() {

  const [prompt, setPrompt] = useState("");
  const [promptQuestion, setPromptQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e) {
    setIsLoading(true);
  console.log(promptQuestion);

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{'role': 'user', 'content': promptQuestion}]
  });

  const generatedText = response['choices'][0]['message']['content'];

  await setPrompt((prevPrompt) =>  prevPrompt + '\n\n' + generatedText );

  console.log(generatedText.toLowerCase);

  setIsLoading(false);
  }

  return (
    <div>
      <Header />
      <div className="content">
        <Title name="Prompts">
          <FiSettings size={25} />
        </Title>
        <div className="container-00">
          <div className="responseDiv" style={{ whiteSpace: 'pre-line' }}>
            {prompt ? "" : "Pegunte a IA!"}
            {isLoading ? <div>Generating...</div> : prompt}
          </div>
        </div>
        <div className="container-01">
          <textarea rows={10} type="text" onChange={e => setPromptQuestion(e.target.value)} />
          <button onClick={handleSubmit}>Send</button>
        </div>
      </div>
    </div>
  );
}