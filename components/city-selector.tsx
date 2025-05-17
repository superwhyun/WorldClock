"use client"

import { useState } from "react"
import { Check, ChevronsUpDown, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { MAJOR_CITIES, CITIES_BY_CONTINENT, searchCities, type CityInfo } from "@/lib/city-data"

interface CitySelectorProps {
  onSelect: (timezone: string, countryCode: string, cityName: string, cityNameEn: string, countryName: string) => void
}

export default function CitySelector({ onSelect }: CitySelectorProps) {
  const [open, setOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredCities = searchQuery ? searchCities(searchQuery) : MAJOR_CITIES

  const handleSelect = (city: CityInfo) => {
    onSelect(city.timezone, city.countryCode, city.name, city.nameEn, city.country)
    setOpen(false)
    setSearchQuery("")
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            <span>시계 추가</span>
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[350px] p-0">
        <Command>
          <CommandInput 
            placeholder="도시 또는 국가 검색..." 
            value={searchQuery}
            onValueChange={setSearchQuery}
          />
          <CommandList className="max-h-[400px]">
            <CommandEmpty>
              <div className="py-6 text-center">
                <Globe className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">검색된 도시가 없습니다.</p>
              </div>
            </CommandEmpty>

            {searchQuery ? (
              // 검색 결과 표시
              <CommandGroup heading="검색 결과">
                {filteredCities.map((city) => (
                  <CommandItem 
                    key={city.id} 
                    value={`${city.name} ${city.country}`} 
                    onSelect={() => handleSelect(city)}
                    className="cursor-pointer"
                  >
                    <div className="flex items-center gap-3 w-full">
                      <img
                        src={`https://flagcdn.com/w20/${city.countryCode.toLowerCase()}.png`}
                        width="20"
                        height="15"
                        alt={`${city.country} 국기`}
                        className="rounded-sm"
                      />
                      <div className="flex-1">
                        <div className="font-medium">{city.name}</div>
                        <div className="text-xs text-muted-foreground">{city.country} • {city.utcOffset}</div>
                      </div>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            ) : (
              // 대륙별 그룹 표시
              Object.entries(CITIES_BY_CONTINENT).map(([continent, cities]) => (
                <CommandGroup key={continent} heading={continent}>
                  {cities.map((city) => (
                    <CommandItem 
                      key={city.id} 
                      value={`${city.name} ${city.country}`}
                      onSelect={() => handleSelect(city)}
                      className="cursor-pointer"
                    >
                      <div className="flex items-center gap-3 w-full">
                        <img
                          src={`https://flagcdn.com/w20/${city.countryCode.toLowerCase()}.png`}
                          width="20"
                          height="15"
                          alt={`${city.country} 국기`}
                          className="rounded-sm"
                        />
                        <div className="flex-1">
                          <div className="font-medium">{city.name}</div>
                          <div className="text-xs text-muted-foreground">{city.country} • {city.utcOffset}</div>
                        </div>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              ))
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}