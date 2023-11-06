import Title from "../../components/Title";
import Header from "../../components/Header";
import { FiSettings } from "react-icons/fi";
import "./prompts.css";
export default function Prompts() {
  return (
    <div>
      <Header />
      <div className="content">
        <Title name="Prompts">
          <FiSettings size={25} />
        </Title>
        <div className="container-00">
            <span>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </span>
            <span>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </span>
        </div>
        <div className="container-01">
            <textarea rows={10} type="text"/>
            <button>Send</button>
        </div>
      </div>
    </div>
  );
}
