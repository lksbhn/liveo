import { ConnectionStateService } from "./connection-state-service";
import { TestBed, fakeAsync } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { EndpointService } from "@live/services";
import createMockInstance from "jest-create-mock-instance";

describe("ConnectionStateService", () => {
  let connectionStateService: ConnectionStateService;
  let endpointService: jest.Mocked<EndpointService>;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    endpointService = createMockInstance(EndpointService);

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        ConnectionStateService,
        { provide: EndpointService, useValue: endpointService }
      ]
    });

    connectionStateService = TestBed.get(ConnectionStateService);
    httpTestingController = TestBed.get(HttpTestingController);

    endpointService.getEndpoint.mockReturnValue("connection");
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it("should construct", () => {
    expect(connectionStateService).toBeTruthy();
  });

  it("should emit correctly when online", fakeAsync(() => {
    connectionStateService.checkConnectionState();

    connectionStateService.isOnline$.subscribe((isOnline) => {
      expect(isOnline).toBe(true);
    });

    const req = httpTestingController.expectOne("connection");
    expect(req.request.method).toBe("GET");
    req.flush("online");
  }));

  it("should emit correctly when offline", fakeAsync(() => {
    connectionStateService.checkConnectionState();

    connectionStateService.isOnline$.subscribe((isOnline) => {
      expect(isOnline).toBe(false);
    });

    const req = httpTestingController.expectOne("connection");
    expect(req.request.method).toBe("GET");
    req.error(new ErrorEvent("No connection"));
  }));
});
