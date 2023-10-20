/**
 * v0 by Vercel.
 * @see https://v0.dev/t/ZgFPYYuxXoy
 */
import { SelectValue, SelectTrigger, SelectLabel, SelectItem, SelectGroup, SelectContent, Select } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
// import "./placeholder.png";

export default function Component() {
  return (
    <div key="1" className="min-h-screen flex flex-col bg-gradient-to-r from-purple-200 to-blue-200">
      <main className="flex-1 p-4 flex justify-center">
        <div className="mx-auto bg-white rounded-xl shadow-md overflow-hidden h-full min-w-[960px] max-w-[1200px]">
          <div className="flex justify-between p-3 border-b">
            <h2 className="text-lg font-medium">Chat</h2>
            <svg
              className=" h-4 w-4 text-gray-600"
              fill="none"
              height="24"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
              <path d="M21 3v5h-5" />
              <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
              <path d="M8 16H3v5" />
            </svg>
          </div>
          <div className="p-3 h-3/4 overflow-y-scroll">
            <div className="flex items-center space-x-3 p-2">
              <img
                alt="Chat Bot"
                className="rounded-full"
                height="32"
                src="/placeholder.png"
                style={{
                  aspectRatio: "32/32",
                  objectFit: "cover",
                }}
                width="32"
              />
              <p className="bg-gray-300 rounded-md py-2 px-3 text-sm">Hello! Let's start the test.</p>
            </div>
            <div className="flex items-center space-x-3 p-2">
              <img
                alt="Chat Bot"
                className="rounded-full"
                height="32"
                src="./placeholder.png"
                style={{
                  aspectRatio: "32/32",
                  objectFit: "cover",
                }}
                width="32"
              />
              <p className="bg-gray-300 rounded-md py-2 px-3 text-sm">Example chat 1.</p>
            </div>
            <div className="flex items-center space-x-3 p-2">
              <img
                alt="Chat Bot"
                className="rounded-full"
                height="32"
                src="./placeholder.png"
                style={{
                  aspectRatio: "32/32",
                  objectFit: "cover",
                }}
                width="32"
              />
              <p className="bg-gray-300 rounded-md py-2 px-3 text-sm">Example chat 2.</p>
            </div>
            <div className="flex items-center space-x-3 p-2">
              <img
                alt="Chat Bot"
                className="rounded-full"
                height="32"
                src="./placeholder.png"
                style={{
                  aspectRatio: "32/32",
                  objectFit: "cover",
                }}
                width="32"
              />
              <p className="bg-gray-300 rounded-md py-2 px-3 text-sm">Example chat 3.</p>
            </div>
            <div className="flex items-center justify-end space-x-3 p-2">
              <p className="bg-blue-300 rounded-md py-2 px-3 text-sm">Example chat from me 1.</p>
              <img
                alt="Me"
                className="rounded-full"
                height="32"
                src="./placeholder.png"
                style={{
                  aspectRatio: "32/32",
                  objectFit: "cover",
                }}
                width="32"
              />
            </div>
            <div className="flex items-center justify-end space-x-3 p-2">
              <p className="bg-blue-300 rounded-md py-2 px-3 text-sm">Example chat from me 2.</p>
              <img
                alt="Me"
                className="rounded-full"
                height="32"
                src="./placeholder.png"
                style={{
                  aspectRatio: "32/32",
                  objectFit: "cover",
                }}
                width="32"
              />
            </div>
          </div>
          <div className="border-t p-3">
            <form className="flex items-center">
              <Select className="flex-1">
                <SelectTrigger>
                  <SelectValue placeholder="Select your answer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Options</SelectLabel>
                    <SelectItem value="option1">Option 1</SelectItem>
                    <SelectItem value="option2">Option 2</SelectItem>
                    <SelectItem value="option3">Option 3</SelectItem>
                    <SelectItem value="option4">Option 4</SelectItem>
                    <SelectItem value="option5">Option 5</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Button className="ml-2 bg-gray-700 text-white text-sm" type="submit">
                Send
              </Button>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}
