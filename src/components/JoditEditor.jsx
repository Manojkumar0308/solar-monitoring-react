import React, { useState, useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';

const Example = ({ placeholder }) => {
	const editor = useRef(null);
	const [content, setContent] = useState('');

	const config = useMemo(()=>(
		{
			readonly: false,
			placeholder: placeholder || 'Start typings...',
            height: 300 // add this line to set the height to 300px
		}),
		[placeholder]
	);
    const handleBlur = (newContent) => {
        console.log('Text written in editor:', newContent);
        setContent(newContent);
      };
	return (
        <div className='mt-8'>
        <JoditEditor
          ref={editor}
          value={content}
          config={config}
          tabIndex={1} // tabIndex of textarea
          onBlur={handleBlur} // preferred to use only this option to update the content for performance reasons
          onChange={newContent => {}}
        />
      </div>
	);
};

export default Example;