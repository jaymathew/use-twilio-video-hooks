import { useCallback, useEffect, useState } from 'react'
import { connect, Room, ConnectOptions } from 'twilio-video'

const INITIAL_STATE = {
	room: undefined,
	error: undefined
} as {
	room?: Room,
	error?: Error
}

const useRoomConnection = () => {
	const [roomState, setRoomState] = useState(INITIAL_STATE)
	const { room } = roomState

	/**
   * connect to a room
   */
	const connectRoom = useCallback(({ token, options }:{ token: string, options?: ConnectOptions }) => {
		connect(token, options)
			.then(room => {
				setRoomState(c => ({ ...c, room }))
				console.log(`Successfully joined a Room: ${room}`)
			})
			.catch(error => {
				console.error(`Unable to connect to Room: ${error.message}`)
				setRoomState(c => ({ ...c, error }))
			})
	}, [])

	/**
   * Disconnect from room
   */
	const disconnectRoom = useCallback(() => {
		if (room) {
			room.disconnect()
		}
	}, [room])

	/**
   * handle on beforeunload & on pagehide
   */
	useEffect(() => {
		if (room) {
			window.addEventListener('beforeunload', disconnectRoom)
			window.addEventListener('pagehide', disconnectRoom)

			// remove listener
			room.once('disconnected', () => {
				window.removeEventListener('beforeunload', disconnectRoom)
				window.removeEventListener('pagehide', disconnectRoom)
			})

			return () => {
				window.removeEventListener('beforeunload', disconnectRoom)
				window.removeEventListener('pagehide', disconnectRoom)
			}
		}
	}, [disconnectRoom, room])

	return { ...roomState, disconnectRoom, connectRoom }
}

export default useRoomConnection
