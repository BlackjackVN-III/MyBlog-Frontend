import React, { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Bold, Italic, List, ListOrdered, Quote, Heading1, Heading2, Redo, Undo, Code } from "lucide-react";

export default function RichTextEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (html: string) => void;
}) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  // Sync content from outside (e.g. when editing a post)
  useEffect(() => {
    if (editor && !editor.isFocused && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className="border border-border rounded-xl bg-secondary overflow-hidden">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-1 p-2 border-b border-border bg-card">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={`p-2 rounded hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors ${
            editor.isActive("bold") ? "bg-secondary text-accent font-bold" : ""
          }`}
          title="Đậm"
        >
          <Bold className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={`p-2 rounded hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors ${
            editor.isActive("italic") ? "bg-secondary text-accent" : ""
          }`}
          title="Nghiêng"
        >
          <Italic className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`p-2 rounded hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors ${
            editor.isActive("heading", { level: 1 }) ? "bg-secondary text-accent font-bold" : ""
          }`}
          title="Tiêu đề 1"
        >
          <Heading1 className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-2 rounded hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors ${
            editor.isActive("heading", { level: 2 }) ? "bg-secondary text-accent font-bold" : ""
          }`}
          title="Tiêu đề 2"
        >
          <Heading2 className="w-4 h-4" />
        </button>
        <div className="w-px h-6 bg-border mx-1 my-auto" />
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors ${
            editor.isActive("bulletList") ? "bg-secondary text-accent" : ""
          }`}
          title="Danh sách dấu tròn"
        >
          <List className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors ${
            editor.isActive("orderedList") ? "bg-secondary text-accent" : ""
          }`}
          title="Danh sách số"
        >
          <ListOrdered className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-2 rounded hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors ${
            editor.isActive("blockquote") ? "bg-secondary text-accent" : ""
          }`}
          title="Trích dẫn"
        >
          <Quote className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`p-2 rounded hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors ${
            editor.isActive("codeBlock") ? "bg-secondary text-accent" : ""
          }`}
          title="Khối mã nguồn (Code Block)"
        >
          <Code className="w-4 h-4" />
        </button>
        <div className="w-px h-6 bg-border mx-1 my-auto" />
        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
          className="p-2 rounded hover:bg-secondary text-muted-foreground hover:text-foreground disabled:opacity-50 transition-colors"
          title="Hoàn tác (Undo)"
        >
          <Undo className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
          className="p-2 rounded hover:bg-secondary text-muted-foreground hover:text-foreground disabled:opacity-50 transition-colors"
          title="Làm lại (Redo)"
        >
          <Redo className="w-4 h-4" />
        </button>
      </div>

      {/* Editor Content Area */}
      <div className="p-4 min-h-[250px] max-h-[400px] overflow-y-auto bg-card focus:outline-none">
        <EditorContent editor={editor} className="outline-none min-h-[200px]" />
      </div>
    </div>
  );
}
