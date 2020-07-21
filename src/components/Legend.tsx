import { Box, Flex, Typography } from '@committed/components'
import { BackgroundProperty, FlexDirectionProperty } from 'csstype'
import React from 'react'
import { Mark } from './Mark'

export interface LegendProps {
  typeColors: { [index: string]: BackgroundProperty<string> }
  selectedTypes: string[]
  toggleType: (type: string) => void
  fadeMarks?: boolean
  layout?: FlexDirectionProperty
  /** Optional. Customises the styling of the text. Applied to all text regardless of annotations. See https://material-ui.com/api/typography/ for a full list of options. */
  typographyProps?: React.ComponentProps<typeof Typography>
}

export const Legend: React.FC<LegendProps> = ({
  typeColors,
  selectedTypes,
  toggleType,
  fadeMarks,
  typographyProps,
  layout = 'row'
}) => {
  return (
    <Typography {...typographyProps}>
      <Flex flexDirection={layout} flexWrap="wrap">
        {Object.keys(typeColors).map(t => {
          const onClick = () => toggleType(t)
          return (
            <Box key={t} m={1} onClick={onClick}>
              <Mark
                marks={[{ length: t.length, offset: 0, markType: t }]}
                hideType={true}
                typeColors={typeColors}
                fade={fadeMarks}
                getTooltipText={null}
                onClick={onClick}
                included={selectedTypes.includes(t)}
              >
                {t}
              </Mark>
            </Box>
          )
        })}
      </Flex>
    </Typography>
  )
}
