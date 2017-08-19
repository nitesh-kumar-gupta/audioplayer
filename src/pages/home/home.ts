import {AfterContentInit, Component} from '@angular/core';
import { AudioProvider } from 'ionic-audio';
import { NavController } from 'ionic-angular';
import {ITrackConstraint} from "ionic-audio/dist/ionic-audio-interfaces";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements AfterContentInit{
  myTracks: any;
  selectedTrack: number;
  isPlaying: boolean[];
  constructor(public navCtrl: NavController, private _audioProvider: AudioProvider) {
    this.myTracks = [{
      src: 'https://archive.org/download/JM2013-10-05.flac16/V0/jm2013-10-05-t12-MP3-V0.mp3',
      artist: 'John Mayer',
      title: 'Why Georgia',
      art: 'https://pbs.twimg.com/profile_images/822251283406934016/pQC2vwZT.jpg',
      preload: 'metadata'
    },{
      src: 'https://archive.org/download/JM2013-10-05.flac16/V0/jm2013-10-05-t30-MP3-V0.mp3',
      artist: 'John Mayer',
      title: 'Who Says',
      art: 'https://pbs.twimg.com/profile_images/822251283406934016/pQC2vwZT.jpg',
      preload: 'metadata'
    }];
    this.selectedTrack = 0;
  }

  ngAfterContentInit() {
    this.isPlaying = [];
    this.myTracks.forEach((track) => {
      this._audioProvider.create(track);
      this.isPlaying.push(false);
    });
  }

  playSelectedTrack(num) {
    if(num !== this.selectedTrack) {
      this._audioProvider.stop(this.selectedTrack);
      this.isPlaying[this.selectedTrack] = false;
    }
    this.selectedTrack = num;
    this._audioProvider.play(this.selectedTrack);
    this.isPlaying[num] = true;
  }

  pauseSelectedTrack(num) {
    this.selectedTrack = num;
    this._audioProvider.pause(this.selectedTrack);
    this.isPlaying[num] = false;
  }

  onTrackFinished(track: any) {
    console.log('Track finished', track)
  }

}
