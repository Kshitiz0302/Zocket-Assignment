import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { adBgColor } from '../../app/adSlice.js'; 
import { SketchPicker } from 'react-color';
import Queue from '../../utils/lastPick.js'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faPlus } from '@fortawesome/free-solid-svg-icons';

function BackgroundColorPicker() { 
    const [selectedColor, setSelectedColor] = useState(); 
    const [recentColors, setRecentColors] = useState(new Queue());
    const [showPicker, setShowPicker] = useState(false); 
    const [previousColor, setPreviousColor] = useState(''); 

    const dispatch = useDispatch();

    const updateRecentColors = () => {
        let updatedRecentColors = new Queue();
        updatedRecentColors = Object.assign(recentColors);
        if (previousColor === selectedColor) {
            return;
        }
        if (Object.keys(recentColors.array).length >= 5) {
            updatedRecentColors.pop();
            updatedRecentColors.push(selectedColor);
        } else {
            updatedRecentColors.push(selectedColor);
        }
        setRecentColors(updatedRecentColors);
    };

    useEffect(() => {
        dispatch(adBgColor(selectedColor)); 
    }, [selectedColor, dispatch]);

    const handleColorChange = (color) => {
        setSelectedColor(color.hex);
    };

    return (
        <>
            <div>
                <h1 className='text-slate-300 text-sm font-bold'>Choose your color </h1>
                <div className='flex mt-2 '>
                    {Object.values(recentColors.array).map((color, index) => (
                        <div key={index} onClick={() => setSelectedColor(color)} style={{ backgroundColor: color }} 
                        className={` w-7 mr-2 h-7 text-lg font-bold rounded-full cursor-pointer text-center `}/>
                    ))}
                    <div className='w-7 h-7 text-lg font-bold bg-slate-100  rounded-full cursor-pointer text-center' onClick={() => setShowPicker(true)}><FontAwesomeIcon icon={faPlus} /></div>
                    {
                        showPicker && 
                        <div className="relative">
                            <div
                                onClick={() => {
                                setShowPicker(false);
                                setPreviousColor(selectedColor);
                                updateRecentColors();
                                }}
                                className="fixed inset-0 z-10 bg-black opacity-25"
                            />
                            <div className="absolute z-20 top-full left-0 mt-2">
                                <SketchPicker color={selectedColor} onChange={handleColorChange}/> 
                            </div>
                        </div>
                    }
                </div> 
            </div>
        </>
    );
}

export default BackgroundColorPicker;
