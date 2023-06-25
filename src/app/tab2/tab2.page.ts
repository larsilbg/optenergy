import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from "../services/user.service";
import {Device, DeviceGroup, UserType} from "../../lib/UserType";
import {IonModal, LoadingController} from "@ionic/angular";

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{
  user?: UserType;
  activePage: string = 'devices';
  addGroupObject?: DeviceGroup | undefined = undefined;
  devices!: Device[];
  createDevice: Device = {
    SteckdoseID: '',
    Bezeichnung: '',
    IstAn: false,
    AktivStartzeit: null,
    AktivEndzeit: null,
    SteckdosengruppeID: ""
  }

  editDeviceObject: Device = {
    SteckdoseID: '',
    Bezeichnung: '',
    IstAn: false,
    AktivStartzeit: null,
    AktivEndzeit: null,
    SteckdosengruppeID: ""
  }

  steckdosengruppen!: DeviceGroup[];

  @ViewChild(IonModal) modal!: IonModal;
  editDeviceOpen: boolean = false;
  private createBezeichnung?: string;

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    if (this.createDevice.Bezeichnung && this.createDevice.SteckdosengruppeID) {
      this.modal.dismiss(this.createDevice, 'confirm');
    }
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent;
    if (ev.detail.role === 'confirm') {
      this.loadingCtrl.create({
        message: 'Gerät wird hinzugefügt...'
      }).then(
        (loading) => {
          loading.present()
          this.userService.addDevice(this.createDevice!).subscribe(
            (devices) => {
              this.createDevice = {
                SteckdoseID: '',
                Bezeichnung: '',
                IstAn: false,
                AktivStartzeit: null,
                AktivEndzeit: null,
                SteckdosengruppeID: ""
              }
              loading.dismiss()
            }
          )
        }
      )
    }
  }

  onWillDismissEdit() {
    if (this.editDeviceObject.Bezeichnung && this.editDeviceObject.SteckdosengruppeID) {
      this.loadingCtrl.create({
        message: 'Gerät wird aktualisiert...'
      }).then(
        (loading) => {
          loading.present()
          this.userService.editDevice(this.editDeviceObject!).subscribe(
            (devices) => {
              loading.dismiss()
              this.editDeviceObject = {
                SteckdoseID: '',
                  Bezeichnung: '',
                  IstAn: false,
                  AktivStartzeit: null,
                  AktivEndzeit: null,
                  SteckdosengruppeID: ""
              }
              this.editDeviceOpen = false;
            }
          )
        }
      )
    }
  }

  constructor(private userService: UserService, private loadingCtrl: LoadingController) {}

  ngOnInit() {
    this.userService.getDevices().subscribe(
      (devices) => {
        this.devices = devices
      })
    this.userService.getDeviceGroups().subscribe(
      (groups: DeviceGroup[]) => {
        this.steckdosengruppen = groups
      }
    )
    this.userService.getUser().subscribe(
      (user) => {
        this.user = user
      }
    )
  }

  logout() {
    localStorage.removeItem('analyse');
    localStorage.removeItem('token');
    window.location.reload();
  }

  turnOff(device: Device) {
    console.log(device)
    this.userService.editDevice({...device, IstAn: !device.IstAn, AktivStartzeit: null, AktivEndzeit: null}).subscribe(
      (devices) => {
      })
  }

  editDevice(device: Device) {
    this.editDeviceObject = device;
    console.log(this.editDeviceObject)
    this.editDeviceOpen = true;
  }

  handleChange(e: any) {
    this.createDevice.SteckdosengruppeID = e.detail.value
  }

  handleChangeEdit(e: any) {
    this.editDeviceObject.SteckdosengruppeID = e.detail.value
  }

  filterDevices($event: any) {
    const searchTerm = $event.detail.value
    if (searchTerm === '') {
      this.userService.getDevices().subscribe(
        (devices: Device[]) => {
          this.devices = devices
        })
    } else {
      this.userService.getDevices().subscribe(
        (devices: Device[]) => {
          this.devices = devices.filter(device => device.Bezeichnung.includes(searchTerm))
        })
    }
  }

  changePage($event: any) {
    this.activePage = $event.detail.value
  }

  editGroup(group: DeviceGroup) {

  }

  addGroup() {
    if(!this.addGroupObject) {
      this.addGroupObject = { Bezeichnung: ''} as DeviceGroup;
      this.steckdosengruppen.push(this.addGroupObject)
    } else {

    }
  }

  cancelGroup() {
    this.addGroupObject = undefined;
    this.steckdosengruppen.pop()
  }

  createGroup(group: {Bezeichnung: string}) {
    this.addGroupObject = { Bezeichnung: this.createBezeichnung} as DeviceGroup;
    this.userService.addDeviceGroup(this.addGroupObject).subscribe(
      (groups: DeviceGroup[]) => {
        this.addGroupObject = undefined;
        this.createBezeichnung = undefined;
      }
    )
  }

  updateAddGroup($event: any) {
    this.createBezeichnung = $event.detail.value
  }

  deleteDevice(SteckdoseID: string) {
    this.userService.deleteDevice(SteckdoseID).subscribe(
      (devices) => {
        this.editDeviceOpen = false;
      }
    )
  }
}
