import { Injectable, HttpException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class OxApiService {
  constructor(private readonly httpService: HttpService) {}

  async getProfile(subdomain: string, token: string): Promise<any> {
    const url = `https://${subdomain}.ox-sys.com/profile`;
    try {
      const { data } = await firstValueFrom(
        this.httpService.get(url, {
          headers: {
            Accept: 'application/json',
            Authorization: token,
          },
        }),
      );
      return data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || 'Failed to validate with OX API',
        error.response?.status || 502,
      );
    }
  }

  async getProducts(
    subdomain: string,
    token: string,
    page: number,
    size: number,
  ): Promise<any> {
    const url = `https://${subdomain}.ox-sys.com/variations?page=${page}&size=${size}`;
    try {
      const { data } = await firstValueFrom(
        this.httpService.get(url, {
          headers: {
            Accept: 'application/json',
            Authorization: token,
          },
        }),
      );
      return data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || 'Failed to fetch products from OX API',
        error.response?.status || 502,
      );
    }
  }
}
