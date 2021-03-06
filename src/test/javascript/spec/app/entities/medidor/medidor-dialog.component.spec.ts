/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { SystemAguaPotableTestModule } from '../../../test.module';
import { MedidorDialogComponent } from '../../../../../../main/webapp/app/entities/medidor/medidor-dialog.component';
import { MedidorService } from '../../../../../../main/webapp/app/entities/medidor/medidor.service';
import { Medidor } from '../../../../../../main/webapp/app/entities/medidor/medidor.model';
import { UsuarioService } from '../../../../../../main/webapp/app/entities/usuario';
import { SectorService } from '../../../../../../main/webapp/app/entities/sector';
import { ClasificacionService } from '../../../../../../main/webapp/app/entities/clasificacion';

describe('Component Tests', () => {

    describe('Medidor Management Dialog Component', () => {
        let comp: MedidorDialogComponent;
        let fixture: ComponentFixture<MedidorDialogComponent>;
        let service: MedidorService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SystemAguaPotableTestModule],
                declarations: [MedidorDialogComponent],
                providers: [
                    UsuarioService,
                    SectorService,
                    ClasificacionService,
                    MedidorService
                ]
            })
            .overrideTemplate(MedidorDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MedidorDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MedidorService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Medidor(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.medidor = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'medidorListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Medidor();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.medidor = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'medidorListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
