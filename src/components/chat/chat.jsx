import React, { useState, useEffect } from 'react';

import './chat.css';
//import Navbar from '../new-profile-page/Navbar.jsx';
import sofia from './matches/sofia.png';
import serena from './matches/serena.png';
import chris from './matches/chris.png';
import codyjack from './matches/codyjack.png';
import hoopgang from './matches/hoopgang.png';

import MatchesArray from './matches/matches.jsx';

import { ReactComponent as Messages } from './Messages.svg';

export function Chat() {

    const [searchBarContents, setSearchBarContents] = useState('');

    const [matches, setMatches] = useState(MatchesArray);
    const [selectedUser, setSelectedUser] = useState('');
    const [showSidebar, setShowSidebar] = useState(true);
    

    function toggleSidebar() {
        setShowSidebar(!showSidebar);
    }
    function changeSearchBarContents(e) {
        setSearchBarContents(e);
    }
    function searchByName(searchTerm) {
        // Ensure the search term is in lower case for case insensitive comparison
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
      
        // Filter the array
        return MatchesArray.filter(item => {
          // Check if the name includes the search term, also in lower case
            return item.name.toLowerCase().includes(lowerCaseSearchTerm);
        });
      }

    useEffect( () => {
        if (searchBarContents != null) {
            const searchResults = searchByName(searchBarContents)
            setMatches(searchResults);
        }
        else {
            setMatches(MatchesArray);
        }

    })


    return (
        <div className='chat-page-container'>
            { showSidebar ? 
                <div>
                    <div className='chat-sidebar'>

                        <div className='sidebar-search-container'>                
                            <input type='text' className='sidebar-search-box' name='sidebar-search-box' maxLength='50' placeholder='Search' onChange={e => changeSearchBarContents(e.target.value)} />
                            <button className='toggle-messages-sidebar' onClick={() => toggleSidebar()}>
                            <Messages />
                            </button>
                        </div>

                        <div className='preview-list'>
                            { matches.map((matchedUser) => (
                                    <div>
                                        <hr className='horizontal-line'/>
                                        <div className='single-chat-preview' >
                                            
                                            <div className='chat-preview-profile-pic-container'>
                                                {   matchedUser.name == 'Sofia'
                                                ? <img className='chat-preview-profile-pic' src={sofia}  />
                                                : matchedUser.name == 'Serena'
                                                ? <img className='chat-preview-profile-pic' src={serena}  />
                                                : matchedUser.name == 'Chris'
                                                ? <img className='chat-preview-profile-pic' src={chris}  />
                                                : matchedUser.name == 'Cody and Jack'
                                                ? <img className='chat-preview-profile-pic' src={codyjack}  />
                                                : matchedUser.name == 'Hoop Gang'
                                                ? <img className='chat-preview-profile-pic' src={hoopgang} />
                                                : <></>
                                                }   
                                            </div>

                                            <div className='chat-preview-text-container'>
                                                <div className='chat-name'>
                                                {matchedUser.name}
                                                </div>
                                                <div className='chat-msg-preview'>
                                                { matchedUser.lastmessage }
                                                </div>
                                            </div>
                                            
                                        </div>
                                    </div>
                                    
                                                                            
                            ))}
                        </div>
                    </div>
                                                
                    
                </div>

            :    
                <div className='chat-right-column'>

                    <div className='user-banner'>

                        
                        <button className='toggle-messages-banner' onClick={() => toggleSidebar()}>
                            <Messages />
                        </button>
                        <div className='matched-user-info'>
                            <img src={sofia} className='matched-user-pfp'/>
                            <div className='matched-user-name'>
                                Sofia
                            </div>
                        </div>

                        <div />
                    </div>
                    
                    <div className='messages'>

                            <div className='matched-user-message-container'>
                                <div className='matched-user-message-text'>
                                    <div className='matched-user-message'>
                                        hey
                                    </div>
                                </div>
                            </div>
                            
                            <div className='you-message-container'>
                                <div className='you-message-text'>
                                yo
                                </div>
                            </div>
                    </div>

                    <div className='message-bar-container'>
                        
                            <input type='text' className='message-bar' placeholder='Type your message...' />
                            <button className='send-button'> Send </button>
                        
                    </div>
                </div>
            }
            
        </div>
    )
}

export default Chat;