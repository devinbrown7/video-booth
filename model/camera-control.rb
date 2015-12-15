require 'singleton'
class CameraControl
  include Singleton

	# The implementation here still needs to be figured out.
	# I have two ideas of how this could be done:
	# 1) Give the recording a recording time. When the recording finishes, use the
	#    end of the recording to trigger the website to show that recording has
	#    stopped. I'm not sure how feasible this is.
	# 2) Start recording, count to length of video time, then stop the recording
	#    when the time runs out and then manually start the stream back up. This
	#    seems like the most straightforward, but I'm not sure if we can just stop
	#    a video recording in progress.

	def start_stream
		# start the stream command
	end

	def start_recording(length)
		# get current date
		# start video command, injecting length and filename

		return video_filename
	end

	def stop_recording
		self.start_stream
	end

end
