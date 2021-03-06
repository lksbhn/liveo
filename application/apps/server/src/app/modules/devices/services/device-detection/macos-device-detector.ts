import { DeviceEntity, DeviceType } from "@liveo/entities";
import { EOL } from "os";
import { Logger } from "../../../core/services/logging/logger";
import { PlatformConstants } from "../../../shared/platform-constants/platform-constants";
import { IdGenerator } from "../../../shared/services/id-generation/id-generator";
import { ProcessExecutionService } from "../../../shared/services/process-execution/process-execution-service";
import { Device } from "../../device/device";
import { DeviceDetector } from "./device-detector";

/**
 * Implementation of device detection on mac os
 */
export class MacOSDeviceDetector extends DeviceDetector {

  constructor(
    logger: Logger,
    audioSystem: PlatformConstants,
    ffmpegPath: string,
    processExecutionService: ProcessExecutionService,
    idGenerator: IdGenerator,
    deviceFactory: (deviceData: DeviceEntity) => Device
  ) {
    super(logger, processExecutionService, idGenerator, deviceFactory);
    this.listDevicesCommand = `${ffmpegPath} -f ${audioSystem.audioModule} -list_devices true -i '' -hide_banner`;
  }

  protected parseResponse(response: string): Device[] {
    const devices = [];
    let isVideo = true;

    const prefix = /^\[AVFoundation/;
    const audioSeparator = /AVFoundation\saudio\sdevices/;
    const deviceParams = /^\[AVFoundation.*?\]\s\[(\d*?)\]\s(.*)$/;
    const searchPrefix = (line: string) => (line.search(prefix) > -1);
    const searchAudioSeparator = (line: string) => isVideo && (line.search(audioSeparator) > -1);

    response.split(EOL)
      .filter(searchPrefix)
      .forEach((line) => {
        if (searchAudioSeparator(line)) {
          isVideo = false;
          return;
        }
        const params = line.match(deviceParams);
        if (params) {
          const id = params[1];
          const name = params[2]
          const deviceType = isVideo ? DeviceType.Video : DeviceType.Audio
          devices.push(this.instantiateDevice(id, name, deviceType));
        }
      });

    return devices;
  }
}
