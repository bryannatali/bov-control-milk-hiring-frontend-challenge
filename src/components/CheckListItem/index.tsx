import Link from 'next/link'
import { CSSProperties, useState } from 'react'
import { FiMoreVertical, FiCalendar, FiArrowRight, FiMapPin } from 'react-icons/fi'
import { GiFarmer } from 'react-icons/gi'

import { CheckList } from '../../types/Checklist'

import {
  CheckListHeader,
  CheckListItemContainer,
  CheckListOptions,
  InfoBox,
  OptionButton,
  ToggleOptionsButton,
  SeeDetailsButton,
} from './styles'

type CheckListType = CheckList & { _id: string }

type CheckListItemProps = {
  checklist: CheckListType
  handleRequestRemoveCheckList?: (checklist: CheckListType) => void
  showActions?: boolean
  style?: CSSProperties
}

export const CheckListItem: React.FC<CheckListItemProps> = ({
  checklist,
  handleRequestRemoveCheckList,
  showActions = true,
  style,
}) => {
  const [toggleOptions, setToggleOptions] = useState(false)

  return (
    <CheckListItemContainer style={style}>
      <CheckListHeader>
        <h2>{checklist.farmer.name}</h2>

        {showActions && (
          <ToggleOptionsButton onClick={() => setToggleOptions(!toggleOptions)}>
            <FiMoreVertical size={20} />
          </ToggleOptionsButton>
        )}
      </CheckListHeader>

      {showActions && toggleOptions && (
        <CheckListOptions>
          <Link href={`/checklists/${checklist._id}/edit`}>
            <OptionButton>
              editar
            </OptionButton>
          </Link>
          <OptionButton onClick={() => handleRequestRemoveCheckList?.(checklist)}>
            excluir
          </OptionButton>
        </CheckListOptions>
      )}

      <InfoBox>
        <GiFarmer size={20} />
        <span>{checklist.from.name}</span>
      </InfoBox>

      <InfoBox>
        <FiMapPin size={20} />
        <span>{checklist.farmer.city}</span>
      </InfoBox>

      <InfoBox>
        <FiCalendar size={20} />
        <span>{checklist.formatedDate}</span>
      </InfoBox>

      <Link href={`/checklists/${checklist._id}`}>
        <SeeDetailsButton>
          ver detalhes
          <FiArrowRight size={20} />
        </SeeDetailsButton>
      </Link>
    </CheckListItemContainer>
  )
}