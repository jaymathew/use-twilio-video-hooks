import useTrackSubscription from './track/useTrackSubscription'
import useTrackAudio from './track/useTrackAudio'
import useTrackVideo from './track/useTrackVideo'
import { LocalParticipant, RemoteParticipant } from 'twilio-video'

interface useTrackProps {
	participant: LocalParticipant | RemoteParticipant ;
}

const useTrack = ({ participant }: useTrackProps) => {
	const { audioTrack, videoTrack } = useTrackSubscription({ participant })
	const { audioOn } = useTrackAudio({ audioTrack })
	const { videoOn } = useTrackVideo({ videoTrack })

	return {
		audioTrack,
		videoTrack,
		audioOn,
		videoOn,
	}
}

export default useTrack
