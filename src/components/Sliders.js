import React, { Component } from 'react';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css'
import InputLabel from '@material-ui/core/InputLabel';
import Tooltip from '@material-ui/core/Tooltip';


class Sliders extends Component {
    render() { 
        var acousticness = this.props.acousticness;
        var danceability = this.props.danceability;
        var energy = this.props.energy;
        var instrumentalness = this.props.instrumentalness;
        var valence = this.props.valence
        return ( 
            <div className="sliderContainer">
                <Tooltip title="Acousticness is a confidence measure of whether a track is acoustic or not">
                    <div>
                        <InputLabel disableAnimation={true} className="slider">Acousticness: {this.props.acousticness}</InputLabel>
                        <InputRange
                            minValue={0.0}
                            maxValue={1.0}
                            step={0.01}
                            value={acousticness}
                            formatLabel={e => ""}
                            onChange={value => this.props.updateSliders(value, 'acousticness')} 
                        />
                    </div>
                </Tooltip>
                <Tooltip title="Danceability describes how suitable a track is for dancing based on a combination of musical elements including tempo, rhythm stability, beat strength, and overall regularity.">
                    <div>
                        <InputLabel disableAnimation={true} className="slider">Danceability: {this.props.danceability}</InputLabel>
                        <InputRange
                            minValue={0.0}
                            maxValue={1.0}
                            step={0.01}
                            value={danceability}
                            formatLabel={e => ""}
                            onChange={ value => this.props.updateSliders(value, 'danceability')} 
                        />
                    </div>
                </Tooltip>
                <Tooltip title="Energy represents a perceptual measure of intensity and activity. Typically, energetic tracks feel fast, loud, and noisy. Perceptual features contributing to this attribute include dynamic range, perceived loudness, timbre, onset rate, and general entropy.">
                    <div>
                        <InputLabel disableAnimation={true} className="slider">Energy: {this.props.energy}</InputLabel>
                        <InputRange
                            minValue={0.0}
                            maxValue={1.0}
                            step={0.01}
                            value={energy}
                            formatLabel={e => ""}
                            onChange={ value => this.props.updateSliders(value, 'energy')} 
                        />
                    </div>
                </Tooltip>
                <Tooltip title="Instrumentalness predicts whether a track contains no vocals. “Ooh” and “aah” sounds are treated as instrumental in this context. Values above 0.5 are intended to represent instrumental tracks, but confidence is higher as the value approaches 1.0.">
                    <div>
                        <InputLabel disableAnimation={true} className="slider">Instrumentalness: {this.props.instrumentalness}</InputLabel>
                        <InputRange
                            minValue={0.0}
                            maxValue={1.0}
                            step={0.01}
                            value={instrumentalness}
                            formatLabel={e => ""}
                            onChange={ value => this.props.updateSliders(value, 'instrumentalness')} 
                        />
                    </div>
                </Tooltip>
                <Tooltip title="Valence is a measure describing the musical positiveness conveyed by a track. Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric), while tracks with low valence sound more negative (e.g. sad, depressed, angry).">
                    <div>
                        <InputLabel disableAnimation={true} className="slider">Valence: {this.props.valence}</InputLabel>
                        <InputRange
                            minValue={0.0}
                            maxValue={1.0}
                            step={0.01}
                            value={valence}
                            formatLabel={e => ""}
                            onChange={ value => this.props.updateSliders(value, 'valence')} 
                        />
                    </div>
                </Tooltip>
            </div>
        );
    }
}
 
export default Sliders;