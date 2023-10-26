import { useEffect, useState } from 'react'
import { Room, LocalParticipant, RemoteParticipant } from 'twilio-video'

interface useDominantSpeakerProps {
	room?: Room
}

const useDominantSpeaker = ({ room }:useDominantSpeakerProps) => {
	const [dominantSpeaker, setDominantSpeaker] = useState<LocalParticipant | RemoteParticipant>()

	useEffect(() => {
		if (room) {
			const handleDominantSpeakerChanged = (participant:LocalParticipant | RemoteParticipant) => setDominantSpeaker(participant)

			room.on('dominantSpeakerChanged', handleDominantSpeakerChanged)

			return () => {
				room.off('dominantSpeakerChanged', handleDominantSpeakerChanged)
			}
		}
	}, [room])

	return { dominantSpeaker }
}

export default useDominantSpeaker
