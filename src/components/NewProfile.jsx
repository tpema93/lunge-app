import React, { useState } from 'react';

import {Plus} from './Plus.svg';
import {X} from './X.svg';
import './NewProfile.css';


export function NewProfile() {

    // React useStates store values that we want to track. 
    // They are read as variables by calling the first name in the array they are set as, 
    // and set by calling the second name in the array as a function with () at the end of the name.

    const [userFirstName, setUserFirstName] = useState('');
    const [userLastName, setUserLastName] = useState('');

    const [userBirthday, setUserBirthday] = useState('');

    const [userGender, setUserGender] = useState('');
    // userGenderShowOther controls whether the "Other" custom entry box shows up
    const [userGenderShowOther, setUserGenderShowOther] = useState(false);

    // GenderColorButton - set the color of the button you click to green & others to gray
    // 0 = none, 1 = Man, 2 = Woman, 3 = Other
    const [userGenderColorButton, setUserGenderColorButton] = useState(0);

    // const [prefGenderColorButton, setPrefGenderColorButton] = useState(0);

    const [preferMan, setPreferMan] = useState(false);
    const [preferWoman, setPreferWoman] = useState(false);
    const [preferOther, setPreferOther] = useState(false);

    const [userBio, setUserBio] = useState('');

    const [uploadedImage1, setUploadedImage1] = useState(null);
    const [uploadedImage2, setUploadedImage2] = useState(null);
    const [uploadedImage3, setUploadedImage3] = useState(null);
    const [uploadedImage4, setUploadedImage4] = useState(null);
    const [uploadedImage5, setUploadedImage5] = useState(null);
    const [uploadedImage6, setUploadedImage6] = useState(null);

    // The functions below all control changes to the useStates above, 
    // when they are called by user interactions in the return() code further below
    function changeFirstName(e) {
        setUserFirstName(e);
    }
    function changeLastName(e) {
        setUserLastName(e);
    }

    function changeBirthday(e) {
        setUserBirthday(e);
    }

    function changeUserGenderToMan() {
        if (userGenderColorButton != 1) {
            setUserGender('Man');
            setUserGenderShowOther(false);
            setUserGenderColorButton(1);
        }
        else {
            setUserGender('');
            setUserGenderShowOther(false);
            setUserGenderColorButton(0);
        }
        
    }
    function changeUserGenderToWoman() {
        if (userGenderColorButton != 2) {
            setUserGender('Woman');
            setUserGenderShowOther(false);
            setUserGenderColorButton(2);
        }
        else {
            setUserGender('');
            setUserGenderShowOther(false);
            setUserGenderColorButton(0);
        }
    }
    function changeUserGenderToOther() {
        if (userGenderColorButton != 3) {
            setUserGender('');
            setUserGenderShowOther(true);
            setUserGenderColorButton(3);
        }
        else {
            setUserGender('');
            setUserGenderShowOther(false);
            setUserGenderColorButton(0);
        }

    }
    function changeOtherGender(e) {
        setUserGender(e);
    }

    function changePreferMan() {
        if (preferMan == false) {
            setPreferMan(true);
        }
        else {
            setPreferMan(false);
        }
    }
    function changePreferWoman() {
        if (preferWoman == false) {
            setPreferWoman(true);
        }
        else {
            setPreferWoman(false);
        }
    }
    function changePreferOther() {
        if (preferOther == false) {
            setPreferOther(true);
        }
        else {
            setPreferOther(false);
        }
    }

    function changeUserBio(e) {
        setUserBio(e);
    }

    function uploadImage1(e) {
        setUploadedImage1(URL.createObjectURL(e.target.files[0]));
    }
    function uploadImage2(e) {
        setUploadedImage2(URL.createObjectURL(e.target.files[0]));
    }
    function uploadImage3(e) {
        setUploadedImage3(URL.createObjectURL(e.target.files[0]));
    }
    function uploadImage4(e) {
        setUploadedImage4(URL.createObjectURL(e.target.files[0]));
    }
    function uploadImage5(e) {
        setUploadedImage5(URL.createObjectURL(e.target.files[0]));
    }
    function uploadImage6(e) {
        setUploadedImage6(URL.createObjectURL(e.target.files[0]));
    }

    function clearImage1() {
        setUploadedImage1(null);
    }
    function clearImage2() {
        setUploadedImage2(null);;
    }
    function clearImage3() {
        setUploadedImage3(null);;
    }
    function clearImage4() {
        setUploadedImage4(null);;
    }
    function clearImage5() {
        setUploadedImage5(null);;
    }
    function clearImage6() {
        setUploadedImage6(null);;
    }

    

    return(
        <div className='NewProfileContainer'>

        

            <div className='NewProfileLeftColumn'>

                <div className='NameContainer'>
                    First Name:
                    <br />
                    <input type='text' name='FirstName' maxLength='25' onChange={e => changeFirstName(e.target.value)}/>
                    <br />
                    Last Name:
                    <br />
                    <input type='text' name='LastName' maxLength='25' onChange={e => changeLastName(e.target.value)}/>
                </div>

                <br />

                <div className='BirthdayContainer'>
                    Birthday:
                    <br />
                    <input type='date' name='Birthday' onChange={e => changeBirthday(e.target.value)}/>
                </div>

                <br />
                
                <div className='YourGenderContainer'>
                    Your Gender:
                    <br />
                    <div className='ManButtons'>
                        {   userGenderColorButton != 1 ?
                            <div className='UnselectedButton'>
                                <button className='button' name='UserGenderMan' onClick={changeUserGenderToMan}>
                                    Man
                                </button>
                            </div>
                            : 
                            <div className='SelectedButton'>
                                <button className='button buttonSelected' name='UserGenderMan' onClick={changeUserGenderToMan}>
                                    Man
                                </button>
                            </div>
                        }
                    </div>
                    
                    

                    <div className='WomanButtons'>
                        {   userGenderColorButton != 2 ?
                            <div className='UnselectedButton'>
                                <button className='button' name='UserGenderWoman' onClick={changeUserGenderToWoman}>
                                    Woman
                                </button>
                            </div>
                            : 
                            <div className='SelectedButton'>
                                <button className='button buttonSelected' name='UserGenderWoman' onClick={changeUserGenderToWoman}>
                                    Woman
                                </button>
                            </div>
                        }
                    </div>


                    <div className='OtherButtons'>
                        {
                            userGenderColorButton != 3 ?
                            <div className='UnselectedButton'>
                                <button className='button' name='UserGenderOther' onClick={changeUserGenderToOther} >
                                    Other
                                </button>
                            </div>
                            :
                            <div className='SelectedButton'>
                                <button className='button buttonSelected' name='UserGenderOther' onClick={changeUserGenderToOther} >
                                    Other
                                </button>
                                </div>
                        }
                        
                        { userGenderShowOther && 
                            <div className='ShowOtherGenderButton'> 
                                <input type='text' name='OtherGenderField' onChange={e => changeOtherGender(e.target.value)} />
                            </div>
                        }
                    </div>
                    
                </div>

                <br />

                <div className='GenderPrefContainer'>
                    Interested in: 
                    <br />
                    <div className='ManButtons'>
                            { preferMan ?
                                <div className='SelectedButton'>
                                    <button className='button buttonSelected' name='PrefGenderMan' onClick={changePreferMan}>
                                        Man
                                    </button>
                                </div>
                                :
                                <div className='UnselectedButton'>
                                    <button className='button ' name='PrefGenderMan' onClick={changePreferMan}>
                                        Man
                                    </button>
                                </div>

                            }
                    </div>

                    <div className='WomanButtons'>
                            { preferWoman ?
                                <div className='SelectedButton'>
                                    <button className='button buttonSelected' name='PrefGenderWoman' onClick={changePreferWoman}>
                                        Woman
                                    </button>
                                </div>
                                :
                                <div className='UnselectedButton'>
                                    <button className='button ' name='PrefGenderWoman' onClick={changePreferWoman}>
                                        Woman
                                    </button>
                                </div>

                            }
                    </div>

                    <div className='OtherButtons'>
                            { preferOther ?
                                <div className='SelectedButton'>
                                    <button className='button buttonSelected' name='PrefGenderOther' onClick={changePreferOther}>
                                        Other
                                    </button>
                                </div>
                                :
                                <div className='UnselectedButton'>
                                    <button className='button ' name='PrefGenderOther' onClick={changePreferOther}>
                                        Other
                                    </button>
                                </div>

                            }
                    </div>
            
                </div>

                <br />

                <div className='BioContainer'>
                    About you:
                    <br />
                    <textarea name='Bio' maxLength='500' rows='5' cols='100' onChange={e => changeUserBio(e.target.value)}/>
                </div>
            </div>

            <div className='NewProfileRightColumn>'>
            Profile Photos:
                <div className='UploadImagesContainer'>
                    

                    <div className='ImageRow1'>
                        <div className='Image1'>
                        <div className='UploadImageSquare'>
                            {uploadedImage1 &&
                                <img className='UploadedImage' src={uploadedImage1} />
                            }
                        </div>
                        <input id='files' type='file'onChange={uploadImage1} />
                        <button name='ClearImage1' onClick={clearImage1} >X</button>
                        </div>

                        <div className='Image2'>
                            <div className='UploadImageSquare'>
                                {uploadedImage2 &&
                                    <img className='UploadedImage' src={uploadedImage2} />
                                }
                            </div>
                            <input id='files' type='file'onChange={uploadImage2} />
                            <button name='ClearImage2' onClick={clearImage2} >X</button>

                        </div>

                        <div className='Image3'>
                            <div className='UploadImageSquare'>
                                {uploadedImage1 &&
                                    <img className='UploadedImage' src={uploadedImage3} />
                                }
                            </div>
                            <input id='files' type='file'onChange={uploadImage3} />
                            <button name='ClearImage3' onClick={clearImage3} >X</button>
                        </div>
                    </div>

                    <div className='ImageRow2'>
                        <div className='Image4'>
                            <div className='UploadImageSquare'>
                                {uploadedImage4 &&
                                    <img className='UploadedImage' src={uploadedImage4} />
                                }
                            </div>
                            <input id='files' type='file'onChange={uploadImage4} />
                            <button name='ClearImage4' onClick={clearImage4} >X</button>
                    </div>

                    <div className='Image5'>
                        <div className='UploadImageSquare'>
                                {uploadedImage5 &&
                                    <img className='UploadedImage' src={uploadedImage5} />
                                }
                            </div>
                            <input id='files' type='file'onChange={uploadImage5} />
                            <button name='ClearImage5' onClick={clearImage5} >X</button>
                        </div>

                    <div className='Image6'>
                        <div className='UploadImageSquare'>
                                {uploadedImage6 &&
                                    <img className='UploadedImage' src={uploadedImage6} />
                                }
                            </div>
                            <input id='files' type='file'onChange={uploadImage6} />
                            <button name='ClearImage6' onClick={clearImage6} >X</button>
                        </div>
                </div>


                

                

                </div>
                <br />
                
                <div className='SaveButtonContainer'>
                    <button name='SaveButton'>
                    Save
                    </button>
                </div>

            </div>

        </div>
    );
}

/* 

const [otherUserGender, setOtherUserGender] = useState();
    const [otherUserGenderPref, setOtherUserGenderPref] = useState('');
    <input type='radio' name='UserGender' id='Other' value='Other'>
                </input>
                { otherUserGender && 
                    <input type='text'
                }




                Your Gender:
            <input type='radio' name='UserGender' id='Man' value='Man'/>
                <label for='Man'>Man</label>

            <input type='radio' name='UserGender' id='Woman' value='Woman' />
                <label for='Woman'>Woman</label>





                */



                /*
                <div className='Image1'>
                    <div className='UploadImageSquare'>
                        {uploadedImage1 &&
                            <img className='UploadedImage' src={uploadedImage1} />
                        }
                    </div>
                    <label for='files' className='AddImageButton'> <img src='./Plus.svg' /> </label>
                    <input id='files' type='file'onChange={uploadImage1} />
                    <button name='ClearImage1' onClick={clearImage1} >X</button>
                </div>
                */