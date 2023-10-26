import { useCallback, useState } from 'react'
import { Room } from 'twilio-video'

interface useToggleCameraProps {
	room?: Room
	initialState: boolean
}

const useToggleCamera = ({ room, initialState }:useToggleCameraProps) => {
	const [isCameraOn, setIsCameraOn] = useState(initialState)

	const toggleCamera = useCallback(() => {
		if (room) {
			if (isCameraOn) {
				// turn off
				room.localParticipant.videoTracks.forEach(publication => {
					publication.track.disable()
				})

				setIsCameraOn(false)
			} else {
				// turn on
				room.localParticipant.videoTracks.forEach(publication => {
					publication.track.enable()
				})

				setIsCameraOn(true)
			}
		}
	}, [isCameraOn, room])

	return { isCameraOn, toggleCamera }
}

export default useToggleCamera
