import "reflect-metadata";
import * as appRoot from "app-root-path";
import * as fs from "fs";
import createMockInstance from "jest-create-mock-instance";
import { Logger } from "../../../lib/logging/logger";
import { ProcessExecutionService } from "../../../lib/process-execution/process-execution-service";
import { LinuxDeviceDetector } from "./../../../lib/devices/linux-device-detector";
import { DeviceData } from "./../../../lib/devices/device-data";
import { Device } from "./../../../lib/devices/device";
import { DeviceState } from "./../../../lib/devices/device-state";

describe("LinuxDeviceDetector", () => {

    let linuxDeviceDetector;
    let processExecutionService;
    let deviceFactory;

    beforeEach(() => {
        const logger = createMockInstance(Logger);
        processExecutionService = createMockInstance(ProcessExecutionService);
        deviceFactory = jest.fn((deviceData: DeviceData, deviceState: DeviceState) => new Device(logger, deviceData, deviceState));

        linuxDeviceDetector = new LinuxDeviceDetector(logger, processExecutionService, deviceFactory);
    });

    it("should construct", async () => {
        expect(linuxDeviceDetector).toBeDefined();
    });

    it("should parse devices correctly when two devices are available", () => {
        const oneDeviceAvailableResource = `${appRoot}/src/tests/resources/system/devices/arecordTwoAvailable.txt`;
        const response = fs.readFileSync(oneDeviceAvailableResource, "utf8");
        jest.spyOn(processExecutionService, "execute")
            .mockImplementation((command: string, callback: any) => callback(null, response, null));

        const promise = linuxDeviceDetector.detectDevices();

        promise.then(() => {
            const devices = linuxDeviceDetector.devices;
            expect(devices.length).toBe(2);
            expect(devices[0].id).toBe("0");
            expect(devices[0].data.description).toBe("ICH5 [Intel ICH5], device 0: Intel ICH [Intel ICH5]");
            expect(devices[1].id).toBe("1");
            expect(devices[1].data.description).toBe("U0x46d0x809 [USB Device 0x46d:0x809], device 0: USB Audio [USB Audio]");
        });
    });
});
