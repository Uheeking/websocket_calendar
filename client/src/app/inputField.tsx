import {
    SelectValue,
    SelectTrigger,
    SelectLabel,
    SelectItem,
    SelectGroup,
    SelectContent,
    Select,
  } from "@/components/ui/select";
  import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const options: any = [
  { value: "option1", label: "뭐해?" },
  { value: "option2", label: "놀자!" },
  { value: "option3", label: "만나자!" },
  { value: "option4", label: "내일 뭐해?" },
  { value: "option5", label: "잘 자~" },
];

const InputField = ({message,setMessage,sendMessage}) => {
  return (
    <div className="border-t p-3">
      <form className="flex input-container" onSubmit={sendMessage}>
        <div className="flex-1">
          <Input
            placeholder="Type your answer..."
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          />
          <br />
        </div>
        <div className="">
          <Button
            className="send-button ml-2 h-10px bg-gray-700 text-white text-sm"
            type="submit"
            disabled={message === ""}
          >
            Send
          </Button>
        </div>
      </form>
    </div>
  );
}
export default InputField;