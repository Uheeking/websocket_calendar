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

const InputField = ({message,setMessage,sendMessage}) => {
  return (
    <div className="border-t p-3">
      <div className="plus-button">+</div>
      <form className="flex input-container" onSubmit={sendMessage}>
        <div className="flex-1">
          <Input
            placeholder="Type your answer..."
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            rows={1}
            
          />
          <br />
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select your answer" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Options</SelectLabel>
                <SelectItem value="option1">뭐해?</SelectItem>
                <SelectItem value="option2">놀자!</SelectItem>
                <SelectItem value="option3">만나자!</SelectItem>
                <SelectItem value="option4">내일 뭐해?</SelectItem>
                <SelectItem value="option5">잘 자~</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="">
          <Button
            className="send-button ml-2 h-full bg-gray-700 text-white text-sm"
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