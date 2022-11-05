import { Controller, Get, Post, Put, Delete, Req, Res, Param, Body, HttpException, Patch } from '@nestjs/common';
import { Request, response, Response } from 'express';
import { AnuncioService, updateDto } from './anuncio.service';

@Controller('anuncio')
class AnuncioController {
    constructor(private readonly service: AnuncioService) {}

    @Post('/')
    async create(@Req() request: Request, @Res() response: Response) {
        const { anuncioQntViews, anuncioQntLinks, codImovel, anuncioDestaque } = request.body;

        const anuncio = await this.service.create({ anuncioQntViews, anuncioQntLinks, codImovel, anuncioDestaque});

        return response.status(201).json(anuncio).send();
    }

    @Get('/')
    async findAll(@Res() response: Response) {
        const anuncios = await this.service.findAll();
        if (!anuncios){
            throw new HttpException("Not Found", 404)
        }
        return response.status(200).json(anuncios).send();
    }

    @Put(':id')
    async updatePut(@Param('id') id: number, @Req() request: Request, @Res() response : Response) {
        const anuncio = await this.service.update(id, request);
        return response.status(200).json(anuncio).send();
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        const anuncio = await this.service.delete(id);
        return response.status(200).json(anuncio).send();
    }

    @Patch(':id')
    async updatePatch(@Param('id') id: number, @Body() {anuncioQntViews, 
                                                        anuncioQntLinks, 
                                                        codImovel, 
                                                        anuncioDestaque}: updateDto) {
        const anuncio = await this.service.update(id, {anuncioQntViews, 
                                                       anuncioQntLinks, 
                                                       codImovel, 
                                                       anuncioDestaque});
        return response.status(200).json(anuncio).send();  
    }

}

export { AnuncioController };