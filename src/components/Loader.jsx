import React from 'react';
import {Blocks} from 'react-loader-spinner';

const Loader = () => {
    return (
        <div className="flex justify-center items-center h-screen"> 
            <Blocks
                height="80"
                width="80"
                color="#4fa94d"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                visible={true}
            />
        </div>
    );
};

export default Loader;