import React, { useState, useEffect } from 'react';
import  {useNavigate} from 'react-router-dom';
import { ReactComponent as Plus } from './Plus.svg';
import { ReactComponent as X } from './X.svg';
import './edit-profile.css';


export function EditProfile() {
    const navigate = useNavigate();


    // React useStates store values that we want to track. 
    // They are read as variables by calling the first name in the array they are set as, 
    // and set by calling the second name in the array as a function with () at the end of the name.

    const [user_id, setUser_id] = useState('');
    const [loaded, setLoaded] = useState(false);

    const [FirstName, setFirstName] = useState('');
    const [LastName, setLastName] = useState('');

    const [Birthday, setBirthday] = useState('');

    const [userGender, setUserGender] = useState('');
    const [prefGender, setPrefGender] = useState([]);
    // userGenderShowOther controls whether the "Other" custom entry box shows up
    const [userGenderShowOther, setUserGenderShowOther] = useState(false);

    // GenderColorButton - set the color of the button you click to yellow & others to gray
    // 0 = none, 1 = Man, 2 = Woman, 3 = Other
    const [userGenderColorButton, setUserGenderColorButton] = useState(0);

    // const [prefGenderColorButton, setPrefGenderColorButton] = useState(0);
    const [preferMan, setPreferMan] = useState(false);
    const [preferWoman, setPreferWoman] = useState(false);
    const [preferOther, setPreferOther] = useState(false);

    const [userBio, setUserBio] = useState('');

    const [uploadedImage1, setUploadedImage1] = useState(null);
    const [uploadedImage2, setUploadedImage2] = useState(null);
    

    // const [imageCount, setImageCount] = useState(0);

    const [allowContinue, setAllowContinue] = useState(false);

    const [message, setMessage] = useState('');

    useEffect(() => {
        setLoaded(false);
        // Fetch user's uid and name on component mount
        fetch('https://www-student.cse.buffalo.edu/CSE442-542/2024-Spring/cse-442j/Backend/getUserInfo.php') // Adjust the path as necessary
          .then(response => response.json())
          .then(data => {
            setFirstName(data.firstName);
            setLastName(data.lastName);
            setUser_id(data.userId);
            console.log('User ID:', data.userId);
            fetchProfileInfo(data.userId);

        })
          .catch(error => console.error('Error fetching uid:', error));
        
      }, []); // Empty dependency array ensures this runs once on mount

      const fetchProfileInfo = (id) => {
        if (id) {
        const formData = new FormData();
        console.log("this is the id: " + id);
        formData.append('user_id', id);
        fetch('https://www-student.cse.buffalo.edu/CSE442-542/2024-Spring/cse-442j/tiff-backend/get-profile-info.php', {
            method: 'POST',
            body: formData,
        }).then(response => response.json())
        .then(res => {
        console.log(res);
        switch (res.status) {
            case 'success':
                console.log("success");
                setBirthday(res.birthday);
                setUserGender(res.gender);
                setPrefGender(res.pref);
                setUserBio(res.bio);
                setUploadedImage1(res.image_1);
                if (res.image_2){
                setUploadedImage2(res.image_2);
                }
                setLoaded(true);
                break;
            case 'error':
                console.log('error' + res.message);
                break;
            default:
                console.log('fatal error');
                break;
            }}).catch(error => console.error('Error fetching profile info:', error));
        }else{
            console.log('User ID not found');
        }};


      useEffect(() => {
        if (userGender !== 'man' && userGender !== 'woman'){
            setUserGenderColorButton(3);
            setUserGenderShowOther(true);
        } else {
            setUserGenderShowOther(false);
            if (userGender === 'man') {
                setUserGenderColorButton(1);
            } else if (userGender === 'woman') {
                setUserGenderColorButton(2);
            }
        }
      }, [loaded]); 

    useEffect(() => {
        const hasWoman = prefGender.includes('woman');
        const hasMan = prefGender.includes('man');
        const hasOther = prefGender.includes('other');

        setPreferWoman(hasWoman);
        setPreferMan(hasMan);
        setPreferOther(hasOther);
    }, [loaded]);

    function changeUserGenderToMan() {
        if (userGenderColorButton != 1) {
            setUserGender('man');
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
            setUserGender('woman');
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
            setPrefGender([...prefGender, 'man'])
        }
        else {
            setPreferMan(false);
            setPrefGender(prefGender.filter(gender => gender !== 'man'));
        }
    }
    function changePreferWoman() {
        if (preferWoman == false) {
            setPreferWoman(true);
            setPrefGender([...prefGender, 'woman'])
        }
        else {
            setPreferWoman(false);
            setPrefGender(prefGender.filter(gender => gender !== 'woman'))
        }
    }
    function changePreferOther() {
        if (preferOther == false) {
            setPreferOther(true);
            setPrefGender([...prefGender, 'other'])
        }
        else {
            setPreferOther(false);
            setPrefGender(prefGender.filter(gender => gender !== 'other'))
        }
    }
    
    const submitHandler = async (e) => {
        e.preventDefault();
        console.log('submitHandler');
        
        try{
            const formData = new FormData();
    
            formData.append('user_id', user_id);
            formData.append('birthday', Birthday); 
            formData.append('gender', userGender); 
            formData.append('pref', JSON.stringify(prefGender));
            formData.append('bio', userBio);
            formData.append('image_1', uploadedImage1);
            uploadedImage2 && formData.append('image_2', uploadedImage2);

            const response = await fetch('https://www-student.cse.buffalo.edu/CSE442-542/2024-Spring/cse-442j/tiff-backend/userprofiles.php', {
                method: 'POST',
                body: formData,
            });
            console.log("posted");

            const data = await response.json();
            console.log("here");

            switch (data.status) {
                case 'success':
                    console.log('success');
                    setMessage('Profile created');
                    alert('Profile created');
                    navigate('/new-activities');
                    break;
                case 'error':
                    console.log('case error');
                    alert('Error: ' + data.message);
                    setMessage(data.message);
                    console.log(data.message);
                    break;
                default:
                    console.log(data);
                    console.log('fatal error');
                    alert('Something went wrong');
                    setMessage('Something went wrong');
                    break;
            }
        } catch (error) {
            setMessage('Error: ' + error);
        };

    };

    
    // the useEffect hook below updates which Continue button to show (on or off)
    useEffect( () => {
        const FirstNameValid = Boolean(FirstName);
        const BirthdayValid = Boolean(Birthday);
        const UserGenderValid = Boolean(userGender);
        const PrefGenderValid = Boolean(preferMan || preferWoman || preferOther);
        const imageValid = Boolean(uploadedImage1);
        
        
        if (/* FirstNameValid && */ BirthdayValid && UserGenderValid && PrefGenderValid && imageValid) {
            setAllowContinue(true);
            // console.log('continue GOOD');
        }
        else {
            setAllowContinue(false);
            // console.log('continue BAD');
        }
    });
    const [newUpload1, setNewUpload1] = useState(false);
    const [newUpload2, setNewUpload2] = useState(false);

    const mynew1 = (e) => {
        setUploadedImage1(URL.createObjectURL(e.target.files[0]));
        console.log('newUploadImage1');
        setNewUpload1(true);
    };

    const mynew2 = (e) => {
        setUploadedImage2(URL.createObjectURL(e.target.files[0]));
        console.log('newUploadImage2');
        setNewUpload2(true);
    };
    


    return(
        <div className='new-profile-page-container'>


        <div className='new-profile-container'>

            <div className='new-profile-left-column'>

                <div className='name-container'>
                    First Name:
                    <br />
                    <input type='text' className='new-profile-text' name='FirstName' maxLength='25' value={FirstName} onChange={(e) => setFirstName(e.target.value)}/>
                    <br />
                    Last Name: 
                    <br />
                    <input type='text' className='new-profile-text' name='LastName' maxLength='25' value={LastName} onChange={e => setLastName(e.target.value)}/>
                </div>

                <div className='birthday-container'>
                    Birthday: 
                    <br />
                    <input type='date' className='new-profile-birthday' name='Birthday' value={Birthday} onChange={e => setBirthday(e.target.value)}/>
                </div>

                <br />
                Your Gender: 
                <div className='your-gender-container'>
                    <br />
                    <div className='gender-buttons'>
                        {   userGenderColorButton != 1 ?
                            <div className='unselected-button'>
                                <button className='new-profile-button' name='UserGenderMan' onClick={() => changeUserGenderToMan()}>
                                    Man
                                </button>
                            </div>
                            : 
                            <div className='selected-button'>
                                <button className='new-profile-button-selected' name='UserGenderMan' onClick={() => changeUserGenderToMan()}>
                                    Man
                                </button>
                            </div>
                        }
                    </div>
                    <div className='gender-buttons'>
                        {   userGenderColorButton != 2 ?
                            <div className='unselected-button'>
                                <button className='new-profile-button' name='UserGenderWoman' onClick={() => changeUserGenderToWoman()}>
                                    Woman
                                </button>
                            </div>
                            : 
                            <div className='selected-button'>
                                <button className='new-profile-button-selected' name='UserGenderWoman' onClick={() => changeUserGenderToWoman()}>
                                    Woman
                                </button>
                            </div>
                        }
                    </div>
                    <div className='gender-buttons'>
                        {
                            userGenderColorButton != 3 ?
                            <div className='unselected-button'>
                                <button className='new-profile-button' name='UserGenderOther' onClick={() => changeUserGenderToOther()} >
                                    Other
                                </button>
                            </div>
                            :
                            <div className='selected-button'>
                                <button className='new-profile-button-selected' name='UserGenderOther' onClick={() => changeUserGenderToOther()} >
                                    Other
                                </button>
                                </div>
                        }
                        
                        
                    </div>
                    
                </div>
                    { userGenderShowOther && 
                        <div className='show-other-gender-button'> 
                            
                            <input type='text' className='new-profile-text'name='OtherGenderField' value={userGender} onChange={e => changeOtherGender(e.target.value)} />
                        </div>
                    }
                

                Interested in: 
                <div className='gender-pref-container'>
                    
                    <br />
                    <div className='pref-buttons'>
                            { preferMan ?
                                <div className='selected-button'>
                                    <button className='new-profile-button-selected' name='PrefGenderMan' onClick={() => changePreferMan()}>
                                        Man
                                    </button>
                                </div>
                                :
                                <div className='UnselectedButton'>
                                    <button className='new-profile-button' name='PrefGenderMan' onClick={() => changePreferMan()}>
                                        Man
                                    </button>
                                </div>

                            }
                    </div>

                    <div className='pref-buttons'>
                            { preferWoman ?
                                <div className='selected-button'>
                                    <button className='new-profile-button-selected' name='PrefGenderWoman' onClick={() => changePreferWoman()}>
                                        Woman
                                    </button>
                                </div>
                                :
                                <div className='UnselectedButton'>
                                    <button className='new-profile-button' name='PrefGenderWoman' onClick={() => changePreferWoman()}>
                                        Woman
                                    </button>
                                </div>

                            }
                    </div>

                    <div className='pref-buttons'>
                            { preferOther ?
                                <div className='selected-button'>
                                    <button className='new-profile-button-selected' name='PrefGenderOther' onClick={() => changePreferOther()}>
                                        Other
                                    </button>
                                </div>
                                :
                                <div className='unselected-button'>
                                    <button className='new-profile-button' name='PrefGenderOther' onClick={() => changePreferOther()}>
                                        Other
                                    </button>
                                </div>

                            }
                    </div>
            
                </div>

                <br />

                <div className='bio-container'>
                    About you:
                    <br />
                    <textarea name='Bio' className='new-profile-bio' maxLength='500' value={userBio} onChange={(e) => setUserBio(e.target.value)}/>
                </div>
            </div>

            <div className='new-profile-right-column'>
            Photos (first one required, must be jpeg): 
                <div className='upload-images-container'>
                    

                    <div className='image-row-top'>
                        <div className='image-and-buttons'>
                        <div className='image-container'>
                            <div className='upload-image-square'>
                                { newUpload1 ? <img className='uploaded-image' src={uploadedImage1} /> : (uploadedImage1 &&
                                    <img className='uploaded-image' src={`data:image/jpeg;base64,${uploadedImage1}`} />
                                )}
                            </div>
                            
                                
                            <div className='image-interact-plus' >
                                <label className='upload-image-label'>
                                    <input id='files' type='file' className='file-input' accept="image/*" onChange={(e) => mynew1(e)} />
                                </label>
                                
                                <Plus className='the-plus'/>
                            </div>
                            
                            <div className='image-interact-x' onClick={() => setUploadedImage1(null)}>
                                <X className='the-x' />
                            </div>    
                        </div>
                        </div>
                    
                        <div className='image-and-buttons'>
                        <div className='image-container'>
                            <div className='upload-image-square'>
                                {newUpload2 ? <img className='uploaded-image' src={uploadedImage2} /> :
                                (uploadedImage2 &&
                                    <img className='uploaded-image' src={`data:image/jpeg;base64,${uploadedImage2}`} />
                                )}
                            </div>
                            
                                
                            <div className='image-interact-plus' >
                                <label className='upload-image-label'>
                                    <input id='files' type='file' className='file-input' accept="image/jpeg" onChange={(e) => mynew2(e)} />
                                </label>
                                
                                <Plus className='the-plus'/>
                            </div>
                            
                            <div className='image-interact-x' onClick={() => setUploadedImage2(null)}>
                                <X className='the-x' />
                            </div>    

                        </div>
                        </div>
                    </div>

                        

                    <div className='image-row-bottom'>
                        
                    </div>
                </div>
                <br />
                
                <div className='continue-button-container'>
                    { allowContinue ?
                        <div className='continue-button-on-div'>
                            <button name='ContinueButtonOn' className='continue-button-on' onClick={(e) => submitHandler(e)}>
                                Continue
                            </button>
                        </div>
                        :
                        <div className='continue-button-off-div'>
                            <button name='ContinueButtonOff' className='continue-button-off'>
                                Continue
                            </button>
                        </div>

                    }
                    
                    
                </div>

                

            </div>

        </div>
    </div>
    );
};

export default EditProfile;


/*
<div>
                    <button onClick={consoleLogButton}>
                        Console Log Button
                    </button>
                </div>
                */


                /*
                <div className='Image1'>
                    <div className='upload-image-square'>
                        {uploadedImage1 &&
                            <img className='uploaded-image' src={uploadedImage1} />
                        }
                    </div>
                    <label for='files' className='AddImageButton'> <img src='./Plus.svg' /> </label>
                    <input id='files' type='file'onChange={uploadImage1} />
                    <button name='ClearImage1' onClick={clearImage1} >X</button>
                </div>
                */



                // <button className='add-file-button' onClick={() => handleAddFileClick1()}> Upload </button>



                 /*
        console.log('IMAGE COUNT BEFORE UPLOAD 1: ' + JSON.stringify(imageCount));
        console.log('is there an image uploaded in slot 1? ' + JSON.stringify(Boolean(uploadedImage1)));
        if (!Boolean(uploadedImage1)) {
            const editImageCount = imageCount+1;
            console.log('editIMAGECOUNT: ' + JSON.stringify(editImageCount));
            setImageCount(editImageCount);
        }
        */

        /*

        <div className='custom-file-upload'>
                                <input id='files' type='file' accept="image/*" onChange={uploadImage1} />
                                <label htmlFor='file-upload'> + </label>
                            </div>




        <input id='files' type='file'onChange={uploadImage2} />
        <button name='ClearImage2' onClick={() => clearImage2()} >X</button>
                            {JSON.stringify(Boolean(uploadedImage2))}
                            */



                            /*


                            <div className='image-container'>
                            <div className='upload-image-square'>
                                {uploadedImage2 &&
                                    <img className='uploaded-image' src={uploadedImage2} />
                                }
                            </div>

                            <input id='files' type='file' accept="image/*" onChange={uploadImage2} />

                            <button name='ClearImage1' className='clear-image' onClick={() => clearImage2()} >X</button>
                            

                        </div>

                        */



                        /*

                        { uploadedImage1
                                ?
                                    <div className='image-interact' >
                                        <label className='clear-image-label' onClick={clearImage1()}>
                                            <X className='the-x'/>
                                        </label>
                                        
                                    </div>
                                :
                                <div className='image-interact' >
                                    <label className='upload-image-label'>
                                        <input id='files' type='file' className='file-input' accept="image/*" onChange={uploadImage1} />
                                    </label>
                                    
                                    <Plus className='the-plus'/>
                                </div>

                                
                            }
                            
                            */