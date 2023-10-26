import { useEffect, useState } from 'react'
import { VideoTrack } from 'twilio-video'

interface useTrackVideoProps {
	videoTrack?: VideoTrack;
}

const useTrackVideo = ({ videoTrack }: useTrackVideoProps) => {
	const [videoOn, setVideoOn] = useState(false)

	useEffect(() => {
		if (videoTrack) {
			// initial state video
			setVideoOn(videoTrack.isEnabled)

			const handleVideoDisabled = () => setVideoOn(false)
			const handleVideoEnabled = () => setVideoOn(true)

			videoTrack.on('disabled', handleVideoDisabled)
			videoTrack.on('enabled', handleVideoEnabled)

			return () => {
				videoTrack.off('disabled', handleVideoDisabled)
				videoTrack.off('enabled', handleVideoEnabled)
			}
		}
	}, [videoTrack])

	return { videoOn }
}

export default useTrackVideo
