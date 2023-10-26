import { useEffect, useState } from 'react'
import { LocalParticipant, RemoteParticipant, VideoTrack, AudioTrack, Track } from 'twilio-video'

interface useTrackSubscriptionProps {
	participant: LocalParticipant | RemoteParticipant
}

const useTrackSubscription = ({ participant }:useTrackSubscriptionProps) => {
	const [videoTrack, setVideoTrack] = useState<VideoTrack>()
	const [audioTrack, setAudioTrack] = useState<AudioTrack>()

	useEffect(() => {
		if (participant) {
			/**
			 * participant track subs
			 */
			const trackSubscribed = (track:Track) => {
				if (track.kind === 'video') {
					setVideoTrack(track as VideoTrack)
				} else if (track.kind === 'audio') {
					setAudioTrack(track as AudioTrack)
				}
			}

			participant.tracks.forEach((publication) => {
				if (publication.track) {
					trackSubscribed(publication.track as Track)
				}
			})

			participant.on('trackSubscribed', trackSubscribed)

			/**
       * participant track unsubs
       */
			const trackUnsubscribed = (track:Track) => {
				if (track.kind === 'video') {
					setVideoTrack(undefined)
				} else if (track.kind === 'audio') {
					setAudioTrack(undefined)
				}
			}
			participant.on('trackUnsubscribed', trackUnsubscribed)

			return () => {
				participant.off('trackSubscribed', trackSubscribed)
				participant.off('trackUnsubscribed', trackUnsubscribed)
			}
		}
	}, [participant])

	return { audioTrack, videoTrack }
}

export default useTrackSubscription
