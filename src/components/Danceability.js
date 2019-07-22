import React, { Component } from 'react';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css'
import InputLabel from '@material-ui/core/InputLabel';
import Tooltip from '@material-ui/core/Tooltip';

class Danceability extends Component {
    render() { 
        var value2 = {
            min: this.props.minDanceability, max: this.props.Danceability
        }
        return ( 
            <Tooltip title="Choose a range which is a multiple of your desired danceability">
            <div className="bpmRangeContainer">
                <InputLabel disableAnimation={true} className="bpm_label">Song range: {this.props.minDanceability} - {this.props.maxDanceability} Danceability</InputLabel>
                <InputRange
                    maxValue={1.0}
                    minValue={0.0}
                    draggableTrack={true}
                    formatLabel={e => ""}
                    onChange={value => this.props.updateDanceability(value2.min, value2.max)} 
                    value={value2}
                    />
            </div>
            </Tooltip>
            
        );
    }
}
 
export default Danceability;