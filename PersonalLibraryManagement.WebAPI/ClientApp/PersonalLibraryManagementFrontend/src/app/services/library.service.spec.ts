import { TestBed } from "@angular/core/testing";
import { LibraryService } from "./library.service";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { CATEGORIES } from "../server/category-data";

describe("LibraryService", () => {
    let libraryService: LibraryService;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                LibraryService
            ]
        });

        libraryService = TestBed.inject(LibraryService);
        httpTestingController = TestBed.inject(HttpTestingController);
    });

    it('should retrieve all categories', () => {
        libraryService.getAllCategory()
            .subscribe(categories => {
                expect(categories).toBeTruthy('No Categories returned');

                expect(categories.length).toBe(8, "Incorrect number of categories")
            });
        const req = httpTestingController.expectOne('https://localhost:7278/api/Book/GetAllCategory?searchKey=');

        expect(req.request.method).toEqual("GET");

        req.flush(CATEGORIES);
    });

    it('should retrieve categories with that matched provided prefix', () => {
        libraryService.getAllCategory()
            .subscribe(categories => {
                expect(categories).toBeTruthy('No Categories Returned');
                expect(categories.length).toBe(1, "Incorrect number of categories");
            });
        
        const searchKey = '';
        const req = httpTestingController.expectOne(`https://localhost:7278/api/Book/GetAllCategory?searchKey=${searchKey}`);
        
        expect(req.request.method).toEqual("GET");
        
        req.flush(['Novel']);
    })
})