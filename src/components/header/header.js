import clsx from 'clsx';
import MenuIcon from '@material-ui/icons/Menu';
import React from 'react';
import { useState, useEffect, useRef } from 'react'
// import { User } from '@leadercodes/leader-header'
import BootstrapTooltip from '@material-ui/core/Tooltip';
import AppBar from '@material-ui/core/AppBar';
import logoVlogger from '../../assets/upload/logoVlogger.svg';
import videoIcon from '../../assets/icons/redVideoCamera.svg';
import uploadNewVideo from '../../assets/icons/uploadVideo.svg';
import uploadVideoHover from '../../assets/uploadVideoHover.svg';
import buttonNewChannel from '../../assets/buttonNewChannel.svg';
import videoCameraHover from '../../assets/videoCameraHover.svg';
import { connect } from 'react-redux';
import linkCopy from '../../assets/linkCopy.svg'
import './header.css'
import configData from '../../config/env/dev'
import { BrowserRouter as Router, Link, } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import $ from 'jquery';

const useStyles = theme => ({
    demo: {
        backgroundColor: theme.palette.background.paper,
    },
    paper: {
        height: 150,
        width: 150,
        padding: 10
    },
    textcontectDetails: {
        marginLeft: '0%',
        marginRight: '5%',
        fontSize: '1.2rem'
    }
});
// export const TokenJwt = document.cookie ? document.cookie.split(";")
//     .filter(s => s.includes('devJwt'))[0].split("=").pop() : null;

function Header(props) {

    const { classes } = props;
    // const [nameChannelToLink, setNameChannelToLink] = useState(" ______")
    const [nameChannelToLink, setNameChannelToLink] = useState("")

    const [videoChannelNameArry, setVideoChannelNameArry] = useState([])
    const [openDrawer, setopenDrawer] = useState(false)
    const [thumbtackStatus, setthumbtackStatus] = useState(false)
    const [open1, setOpen1] = React.useState(false);
    const [userName, setUserName] = React.useState(null);
    const url = window.location
    // let userName;
    const {
        setCreateChannelFlag,
        channelsName,
        videoDetails,
        setIsImageLoad,
        setButtonPauseColor,
        setFontTimeColor,
        setButtonPlayColor,
        setSliderColor,
        setfillBackground,
        setNameCategory,
        setChangeSwitchCta,
        setTextTitle,
        setbackgroundColor,
        settitleColor,
        setbGcolor,
        setTextButton,
        setTextButtonColor,
        setStatusVideo,
        setNumVideo,
        setNameVideo,
        setDescriptionVideo,
        setDateCreatedVideo,
        setEditVideo,
        setDetailsFileVideoSelected,
        setDetailsFilePreviewUrl,
        setPublicToSee,
        setDetailsImagewUrl,
        setNameCompany,
        setHextitleColor,
        setWidthLogo,
        setBorderRadusLogo,
        setBorderRadusLogo1,
        setBorderRadusLogo2,
        setBorderRadusLogo3,
        setBorderRadusLogo4,
        setselectRdiuseView,
        setChangeSwitchLogo,
        setSecoundTimeColor,
        setUrlCta,
        setStringBase64img,
        setStringBase64,
        setDegelVideo,
        setPreviewPoster,
        setStringPoster,
        setTitlePoster,
        setIsLoadPoster,
        setIdFromServer,
        setBackgroundPlayerColor,
        setActiveColor,
        setThumbColor,
        setHexBackgroundPlayerColor,
        setHexbGcolor,
        setHexTextButtonColor,
        setHexButtonPlayColor,
        setHexButtonPauseColor,
        setHexFontTimeColor,
        setHexSliderColor,
        setHexActiveColor,
        setHexThumbColor,
        setToViewInWarp,
        setRightDrawer,
        setIframeVideo,
        setUrlVideo,
        setCurrentTime,
        setRestTime,
        setAoutoPlay,
        setLoopVideo,
        getChannelNameList,
        setChannelVideoName,
        setHexBorderBGcolor,
        setHexbackgroundColor,
        setNumViews,
        setFileUrl,
        setSizeTumb,
        setVideoNameFromUrl,
        setFirstFrame,
        setConfi,
        setUploadProgress,
        statusUploadFile
    } = props

    // useEffect(function () {
    //     getChannelsName()
    // }, [channelsName]);

    // useEffect(function () {
    //     if ((url.pathname.split('/')[1] !== 'admin')) {
    //         var urll = configData.BASE_API_CHANNEL_URL + (url.pathname.split('/')[1]) + '/getUserNameByChannelName'
    //         $.ajax({
    //             url: urll,
    //             method: "GET",
    //             contentType: "application/json",
    //             headers: {
    //                 Authorization: TokenJwt,
    //             },
    //             success: function (data) {
    //                 console.log(data)
    //                 setUserName(data.userName)
    //             },
    //             error: function (err) {
    //                 console.log(err)
    //             }
    //         });
    //     }
    //     else {
    //         setUserName(url.pathname.split('/')[2])
    //         getChannelsName()
    //     }

    // }, []);

    function onChangeNameChannelLink(e) {
        setNameChannelToLink(e)
        // setNameChannelToLink(`<u>${e}</u>`)
    }


    function copyUrl() {
        let textToCopy = document.getElementById("valueToCopy")
        textToCopy.select();

        try {
            debugger
            let successful = document.execCommand('copy');
            let msg = successful ? 'successful' : 'unsuccessful';
            console.log('Copying text command was ' + msg);

        } catch (err) {
            console.log('Oops, unable to copy');
        }
    }

    return (
        <>

            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: openDrawer,
                })}
                style={{ backgroundColor: '#fff', color: 'black' }}
            >
                <div id="top_frame" className="d-flex">

                    <div class='d-flex' style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                        {(url.pathname.split('/')[1]) === 'admin' ?
                            <>
                                <div id='linkCopyUrl' class='d-flex bd-highlight'>
                                    <div class=" flex-shrink-1 bd-highlight" style={{ backgroundColor: '#FFD1D1', borderRadius: '5px 0px 0px 5px' }}>
                                        <BootstrapTooltip title="Copy Link" placement="left">
                                            <button
                                                data-toggle="tooltip" data-placement="left" title="Copy Link"
                                                type='button'
                                                onClick={copyUrl}
                                                style={{ outline: 0, paddingTop: '0px', border: 'none', cursor: 'pointer', backgroundColor: 'transparent' }}
                                            >
                                                <span id="myTooltip1">  <img src={linkCopy} /></span>
                                            </button>
                                        </BootstrapTooltip >
                                    </div>
                                    <div class="w_100 bd-highlight">

                                        <input
                                            InputProps={{ className: classes.multilineColor }}
                                            type="text"
                                            value={`${configData.BASE_URL}${(url.pathname.split('/')[2])}`}
                                            id="valueToCopy"
                                        />

                                    </div>

                                </div>
                                <Link class="bd-highlight" to={{ pathname: `/admin/${userName}/new` }} onClick={() => { setUploadProgress(null); statusUploadFile(false); }} style={{ cursor: 'pointer', marginRight: "5px;" }}>
                                    <BootstrapTooltip title="Upload New Video" placement="bottom">
                                        <button
                                            style={{ outline: 0, paddingTop: '18%', paddingLeft: "0px", border: 'none', cursor: 'pointer', backgroundColor: 'transparent' }}
                                        >
                                            <span id="myTooltip1"><img src={uploadNewVideo} style={{ cursor: 'pointer', width: 'auto', height: '30px' }}
                                                onMouseOver={e => { (e.currentTarget.src = uploadVideoHover) }}
                                                onMouseOut={e => (e.currentTarget.src = uploadNewVideo)} /></span>
                                        </button>
                                    </BootstrapTooltip >
                                </Link>
                                {/* to={{ pathname: `/admin/${videoDetails.userName}/record` }}  */}
                                <Link onClick={() => { setToViewInWarp("record"); setConfi('home'); setUploadProgress(null); statusUploadFile(false); }} class="bd-highlight" style={{ cursor: 'pointer', marginRight: "5px;" }}>
                                    <BootstrapTooltip title="New Record" placement="bottom">
                                        <button
                                            style={{ outline: 0, paddingTop: '18%', paddingLeft: "0px", border: 'none', cursor: 'pointer', backgroundColor: 'transparent' }}
                                        >
                                            <span id="myTooltip1"><img src={videoIcon} style={{ cursor: 'pointer', width: 'auto', height: '30px' }}
                                                onMouseOver={e => { (e.currentTarget.src = videoCameraHover) }}
                                                onMouseOut={e => (e.currentTarget.src = videoIcon)}
                                            /></span>
                                        </button>
                                    </BootstrapTooltip >
                                </Link>
                            </>
                            :
                            <>
                                <div id='linkCopyUrl' class='d-flex bd-highlight'>
                                    <div class=" flex-shrink-1 bd-highlight" style={{ backgroundColor: '#FFD1D1', borderRadius: '5px 0px 0px 5px' }}>
                                        <BootstrapTooltip title="Copy Link" placement="left">
                                            <button
                                                data-toggle="tooltip" data-placement="left" title="Copy Link"
                                                type='button'
                                                onClick={copyUrl}
                                                style={{ outline: 0, paddingTop: '0px', border: 'none', cursor: 'pointer', backgroundColor: 'transparent' }}
                                            // type='button'
                                            // style={{ outline: 0, paddingTop: '0px', border: 'none', cursor: 'pointer', backgroundColor: 'transparent' }}
                                            >
                                                <span id="myTooltip1">  <img src={linkCopy} /></span>
                                            </button>
                                        </BootstrapTooltip>
                                    </div>
                                    <div class="w-100 bd-highlight">
                                        <input
                                            InputProps={{ className: classes.multilineColor }}
                                            type="text"
                                            on
                                            value={`${configData.BASE_URL}${(url.pathname.split('/')[1])}`}
                                            id="valueToCopy"
                                        />
                                    </div>
                                </div>
                                <Link class="bd-highlight" to={{ pathname: `/admin/${userName}/new` }} style={{ cursor: 'pointer', marginRight: "5px;" }}>
                                    <BootstrapTooltip title="Upload New Video" placement="bottom">
                                        <button
                                            style={{ outline: 0, paddingTop: '18%', paddingLeft: "0px", border: 'none', cursor: 'pointer', backgroundColor: 'transparent' }}
                                        >
                                            <span id="myTooltip1"><img src={uploadNewVideo} style={{ cursor: 'pointer', width: 'auto', height: '30px' }}
                                                onMouseOver={e => { (e.currentTarget.src = uploadVideoHover) }}
                                                onMouseOut={e => (e.currentTarget.src = uploadNewVideo)} /></span>
                                        </button>
                                    </BootstrapTooltip >
                                </Link>
                                <Link style={{ cursor: 'pointer', marginRight: "5px;" }}>
                                    <BootstrapTooltip title="New Record" placement="bottom">
                                        <button
                                            style={{ outline: 0, paddingTop: '18%', paddingLeft: "0px", border: 'none', cursor: 'pointer', backgroundColor: 'transparent' }}
                                        >
                                            <span id="myTooltip1"><img src={videoIcon} style={{ cursor: 'pointer', width: 'auto', height: '30px' }}
                                                onMouseOver={e => { (e.currentTarget.src = videoCameraHover) }}
                                                onMouseOut={e => (e.currentTarget.src = videoIcon)}
                                            /></span>
                                        </button>
                                    </BootstrapTooltip >
                                </Link>
                            </>
                        }
                    </div>

                </div>
            </AppBar>
        </>
    )

}
export default connect()(withStyles(useStyles)(Header));


