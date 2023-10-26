import { useCallback, useState } from 'react'
import { Room } from 'twilio-video'

interface useToggleMicrophoneProps {
	room?: Room
	initialState: boolean
}

const useToggleMicrophone = ({ room, initialState }:useToggleMicrophoneProps) => {
	const [isMicrophoneOn, setIsMicrophoneOn] = useState(initialState)

	const toggleMicrophone = useCallback(() => {
		if (room) {
			if (isMicrophoneOn) {
				// turn off
				room.localParticipant.audioTracks.forEach(publication => {
					publication.track.disable()
				})

				setIsMicrophoneOn(false)
			} else {
				// turn on
				room.localParticipant.audioTracks.forEach(publication => {
					publication.track.enable()
				})

				setIsMicrophoneOn(true)
			}
		}
	}, [isMicrophoneOn, room])

	return { isMicrophoneOn, toggleMicrophone }
}

export default useToggleMicrophone
