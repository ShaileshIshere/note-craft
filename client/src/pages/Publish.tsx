import { Appbar } from "../components/Appbar";
import { ChangeEvent, useState } from "react";
import { PublishButton } from "../components/PublishButton";

export const Publish = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    return (
        <div>
            <Appbar />
            <h1 className="text-4xl text-center mb-5 mt-10 font-normal">Write An Article here...</h1>
            <div className="flex justify-center w-full pt-8">
                <div className="max-w-screen-lg w-full">
                    <input 
                        onChange={(e) => setTitle(e.target.value)}
                        type="text"
                        className="focus:outline-none w-full text-gray-900 text-4xl block w-full p-3"
                        placeholder="Title"
                    />
                    <TextEditor onChange={(e) => setDescription(e.target.value)} />
                    <PublishButton title={title} description={description} />
                </div>
            </div>
        </div>
    );
};

function TextEditor({ onChange }: { onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void }) {
    return (
        <div className="mt-2">
            <div className="w-full mb-4">
                <div className="flex items-center justify-between">
                    <div className="my-2 bg-white rounded-b-lg w-full">
                        <label className="sr-only">Publish post</label>
                        <textarea 
                            onChange={onChange} 
                            id="editor" 
                            rows={8} 
                            className="focus:outline-none block w-full px-0 text-xl text-gray-800 bg-white pl-2" 
                            placeholder="description..." 
                            required 
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}