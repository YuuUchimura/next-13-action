import { writeFile } from "fs/promises";

export default function Home() {
  const addImage = async (data: FormData) => {
    "use server";

    const image = data.get("image") as File;

    const arrayBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const filePath = `./public/${image.name}`;

    await writeFile(filePath, buffer);
  };
  return (
    <div>
      <h1>Server Actionsでファイルのアップロード</h1>
      <form className="flex items-center mt-4" action={addImage}>
        <input type="file" name="image" className="border mx-2 p-1" />
        <button
          type="submit"
          className="bg-blue-600 px-2 py-1 rounded-lg text-sm text-white"
        >
          Upload
        </button>
      </form>
    </div>
  );
}
