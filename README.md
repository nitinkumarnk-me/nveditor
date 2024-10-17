
# NVEditor Documentation

## Introduction
The NVEditor is a versatile rich text editor that enables users to create and edit content easily. This documentation covers the basic usage, props, and styling options available for the NVEditor.

## Prerequisites
Before installing NVEditor, ensure that you set up your `.npmrc` file to access Tiptap Pro's private registry. Add the following lines to your project's `.npmrc` file:

```bash
@tiptap-pro:registry=https://registry.tiptap.dev/
//registry.tiptap.dev/:_authToken=your-tiptap-pro-auth-token
```
**Note:**
Just replace `your-tiptap-pro-auth-token` with your actual auth token when setting up the .npmrc file in your project.


## Installation
To install NVEditor, use the following command:

```bash
npm install nveditor
```

## Usage
To use the NVEditor in your React component, import it and include it in your JSX:

```javascript
'use client';

import NVEditor from 'nveditor';
import 'nveditor/styles.css'

export default function MyEditor() {
  const [data, setData] = useState("")

  return <NVEditor data={data} onDataChange={setData}/>
}
```

## Props
The NVEditor accepts the following props:

- **data**: `string` - Initial content in HTML format.
- **onDataChange**: `(content: string) => void` - Function to update the content.
- **onDataInfo?**: `(words: number, characters: number) => void` - Optional callback to receive word and character counts.
- **isDarkModeSwitcherEnable?**: `boolean` - Optional prop to enable dark mode switcher.
- **autocomplete?**: `'on' | 'off'` - Optional prop to control the autocomplete feature.
- **autocorrect?**: `'on' | 'off'` - Optional prop to control the autocorrect feature.
- **autocapitalize?**: `'on' | 'off'` - Optional prop to control the autocapitalize feature.

## Defining Content Area Size
If you want the **content width** of the editor to be exactly `500px`, and you want the entire editor container (including padding or other elements) to be `600px` wide, you can assign the following style to the parent `div` of the `<NVEditor>`.

Use the following CSS:

```css
.editor-container {
  width: calc(500px + 100px); /* 500px content + 100px container space */
}
```

Here's how to assign this style in your JSX:

```javascript
'use client';
import 'nveditor/styles.css'

export default function MyEditor() {
  const [data, setData] = useState("")

  return (
    <div className="editor-container">
      <NVEditor data={data} onDataChange={setData}/>
    </div>
  );
}
```