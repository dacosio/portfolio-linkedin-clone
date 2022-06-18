import React from 'react'
import './Widgets.css'
import InfoIcon from '@mui/icons-material/Info';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

function Widgets() {

    const newsArticle = (heading, subtitle, key) => (
        <div key={key} className="widgets__article">
            <div className="widgets__articleLeft">
                <FiberManualRecordIcon />
            </div>
            <div className="widgets__articleRight">
                <h4>{heading}</h4>
                <p>{subtitle}</p>
            </div>
        </div>
    )

    const newsArticleData = [
        {
            "headline": "Bread Fig And Almond",
            "subtitle": "Alouatta seniculus"
        }, {
            "headline": "Tomato - Green",
            "subtitle": "Columba palumbus"
        }, {
            "headline": "Macaroons - Two Bite Choc",
            "subtitle": "Felis concolor"
        }, {
            "headline": "Crab - Imitation Flakes",
            "subtitle": "Larus dominicanus"
        }, {
            "headline": "Wine - Jaboulet Cotes Du Rhone",
            "subtitle": "Himantopus himantopus"
        }]
    return (
        <div className="widgets">
            <div className="widgets__header">
                <h2>LinedIn News</h2>
                <InfoIcon />
            </div>
            {newsArticleData.map((n, idx) => (
                newsArticle(n.headline, n.subtitle, idx)
            ))}
        </div>
    )
}

export default Widgets