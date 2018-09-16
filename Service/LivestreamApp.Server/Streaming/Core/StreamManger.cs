﻿using LivestreamApp.Server.Streaming.Environment;
using LivestreamApp.Server.Streaming.ProcessCommunication;
using Ninject.Extensions.Logging;

namespace LivestreamApp.Server.Streaming.Core
{
    public class StreamManger
    {
        private readonly ILogger _logger;
        private readonly string _captureAudioCommand;
        private readonly IExternalProcess _externalProcess;
        private readonly AudioInput _audioInput;

        public StreamManger(ILogger logger, IExternalProcess externalProcess, AudioInput audioInput)
        {
            _logger = logger;
            _audioInput = audioInput;
            _externalProcess = externalProcess;
            _captureAudioCommand = $@"ffmpeg -y -f dshow -i audio=""{audioInput}"" -rtbufsize 64 -probesize 64 -acodec libmp3lame -ab 320k -ac 1 -reservoir 0 -f mp3 -hide_banner -fflags +nobuffer pipe:1";
        }

        public void Start()
        {
            _externalProcess.ErrorDataReceived += OutputDataRecievedHandler;
            _externalProcess.ExecuteCommandAsync(_captureAudioCommand);

            _logger.Info($"Started capturing audio on input {_audioInput.Id}.");
        }

        public void Stop()
        {

        }

        private void OutputDataRecievedHandler(object sender, CustomDataReceivedEventArgs e)
        {
        }

    }
}
