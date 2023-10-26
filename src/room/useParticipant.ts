import { useEffect, useState } from 'react'
import { RemoteParticipant, Room } from 'twilio-video'

interface useParticipantProps {
	room?: Room
}

const useParticipant = ({
	room,
}:useParticipantProps) => {
	const [participants, setParticipants] = useState<RemoteParticipant[]>([])
	const localParticipant = room && room.localParticipant

	useEffect(() => {
		if (room) {
			/**
			 * When Participants connect to or disconnect from a Room that you're connected to,
			 * you'll be notified via Participant connection events
			 */
			const handleAlreadyConnected = (participant:RemoteParticipant) =>
				setParticipants(p => [...p, participant])

			const handleNewConnected = (participant:RemoteParticipant) => {
				setParticipants(p => [...p, participant])
			}

			const handleParticipantDisconnected = (participant:RemoteParticipant) => {
				setParticipants(current => current.filter(p => p !== participant))
			}

			// Log any Participants already connected to the Room
			room.participants.forEach(handleAlreadyConnected)
			// new participant connected
			room.on('participantConnected', handleNewConnected)

			room.on('participantDisconnected', handleParticipantDisconnected)

			return () => {
				room.off('participantConnected', handleNewConnected)
				room.off('participantDisconnected', handleParticipantDisconnected)
			}
		}
	}, [room])

	return { localParticipant, remoteParticipants: participants }
}

export default useParticipant
